import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AIService } from '../services/AIService';
import { StorageService } from '../services/StorageService';

export default function AIChatScreen({ navigation, theme }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    loadConversations();
    startNewConversation();
  }, []);

  const loadConversations = async () => {
    const saved = await StorageService.getConversations();
    setConversations(saved);
  };

  const startNewConversation = () => {
    const newId = Date.now().toString();
    setCurrentConversationId(newId);
    setMessages([]);
  };

  const saveConversation = async (updatedMessages) => {
    if (updatedMessages.length === 0) return;

    const conversation = {
      id: currentConversationId,
      title: updatedMessages[0].content.substring(0, 50),
      messages: updatedMessages,
      timestamp: Date.now(),
    };

    const existingIndex = conversations.findIndex(c => c.id === currentConversationId);
    let updated;
    
    if (existingIndex >= 0) {
      updated = [...conversations];
      updated[existingIndex] = conversation;
    } else {
      updated = [conversation, ...conversations];
    }

    setConversations(updated);
    await StorageService.saveConversations(updated);
  };

  const loadConversation = (conversation) => {
    setCurrentConversationId(conversation.id);
    setMessages(conversation.messages);
    setShowMenu(false);
  };

  const deleteConversation = async (id) => {
    const updated = conversations.filter(c => c.id !== id);
    setConversations(updated);
    await StorageService.saveConversations(updated);
    
    if (currentConversationId === id) {
      startNewConversation();
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputText.trim(),
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await AIService.sendMessage(
        userMessage.content,
        messages
      );

      const aiMessage = {
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };

      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      await saveConversation(finalMessages);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: `عذراً، حدث خطأ: ${error.message}`,
        timestamp: Date.now(),
        isError: true,
      };
      
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.role === 'user';
    
    return (
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.aiBubble,
          { backgroundColor: isUser ? theme.primary : theme.cardBackground },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: isUser ? '#FFFFFF' : theme.text },
          ]}
        >
          {item.content}
        </Text>
      </View>
    );
  };

  const renderConversationItem = ({ item }) => (
    <View style={styles.conversationItem}>
      <TouchableOpacity
        style={[styles.conversationButton, { backgroundColor: theme.cardBackground }]}
        onPress={() => loadConversation(item)}
      >
        <Text style={[styles.conversationTitle, { color: theme.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.conversationDate, { color: theme.secondaryText }]}>
          {new Date(item.timestamp).toLocaleDateString('ar-EG')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteConversation(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color={theme.danger} />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.cardBackground, borderBottomColor: theme.border }]}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color={theme.primary} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: theme.text }]}>الذكاء الاصطناعي</Text>
        
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setShowMenu(true)}
        >
          <Ionicons name="menu" size={28} color={theme.primary} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      {messages.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="chatbubbles-outline" size={80} color={theme.secondaryText} />
          <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
            ابدأ محادثة جديدة
          </Text>
          <Text style={[styles.emptySubText, { color: theme.secondaryText }]}>
            اسأل أي سؤال وسأساعدك
          </Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        />
      )}

      {/* Input */}
      <View style={[styles.inputContainer, { backgroundColor: theme.cardBackground, borderTopColor: theme.border }]}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
          placeholder="اكتب رسالتك..."
          placeholderTextColor={theme.secondaryText}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
          textAlign="right"
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            { backgroundColor: inputText.trim() ? theme.primary : theme.border },
          ]}
          onPress={sendMessage}
          disabled={!inputText.trim() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Ionicons name="send" size={20} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>

      {/* Conversations Menu Modal */}
      <Modal
        visible={showMenu}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowMenu(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.border }]}>
              <TouchableOpacity onPress={() => setShowMenu(false)}>
                <Ionicons name="close" size={28} color={theme.text} />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: theme.text }]}>سجل المحادثات</Text>
              <TouchableOpacity
                onPress={() => {
                  startNewConversation();
                  setShowMenu(false);
                }}
              >
                <Ionicons name="add" size={28} color={theme.primary} />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={conversations}
              renderItem={renderConversationItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.conversationsList}
              ListEmptyComponent={
                <View style={styles.emptyConversations}>
                  <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
                    لا توجد محادثات محفوظة
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  headerButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  messagesList: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    borderTopWidth: 0.5,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 0.5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  conversationsList: {
    padding: 16,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  conversationButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginRight: 8,
  },
  conversationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'right',
  },
  conversationDate: {
    fontSize: 14,
    textAlign: 'right',
  },
  deleteButton: {
    padding: 8,
  },
  emptyConversations: {
    padding: 40,
    alignItems: 'center',
  },
});
