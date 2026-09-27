import React, { useState } from 'react';

import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../context/AuthContext';

import {
  startDiagnostic,
  sendDiagnosticMessage,
} from '../../services/diagnosticService';


type Message = {
  id: number;
  sender: 'agriculteur' | 'ia';
  message: string;
};


const DiagnosticChatScreen = () => {

  const navigation = useNavigation<any>();

  const { token } = useAuth();


  const [diagnosticId, setDiagnosticId] =
    useState<number | null>(null);

  const [culture, setCulture] =
    useState('');

  const [message, setMessage] =
    useState('');

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [starting, setStarting] =
    useState(false);


  /*
   * Création du diagnostic
   */
  const handleStartDiagnostic = async () => {

    if (!culture.trim()) {
      return;
    }

    if (!token) {
      return;
    }

    try {

      setStarting(true);

      const result = await startDiagnostic(
        token,
        culture.trim()
      );

      if (result.success) {

        setDiagnosticId(
          result.diagnosticId
        );

        setMessages([
          {
            id: 1,
            sender: 'ia',
            message:
              `Bonjour 👋 Je suis l’assistant AgriChat.

Nous allons analyser votre culture de ${culture.trim()}.

Décrivez-moi les symptômes que vous avez observés afin que je puisse vous aider à identifier le problème.`,
          },
        ]);
      }

    } catch (error) {

      console.error(
        'Erreur création diagnostic :',
        error
      );

      setMessages([
        {
          id: 1,
          sender: 'ia',
          message:
            'Impossible de démarrer le diagnostic. Veuillez vérifier votre connexion et réessayer.',
        },
      ]);

    } finally {

      setStarting(false);

    }
  };


  /*
   * Envoi d'un message à l'IA
   */
  const handleSendMessage = async () => {

    if (!message.trim()) {
      return;
    }

    if (!token) {
      return;
    }

    if (!diagnosticId) {
      return;
    }


    const userMessage =
      message.trim();


    setMessage('');


    const newUserMessage: Message = {
      id: Date.now(),
      sender: 'agriculteur',
      message: userMessage,
    };


    setMessages(
      (previousMessages) => [
        ...previousMessages,
        newUserMessage,
      ]
    );


    try {

      setLoading(true);


      const result =
        await sendDiagnosticMessage(
          token,
          diagnosticId,
          userMessage
        );


      if (result.success) {

        const newAIMessage: Message = {
          id: Date.now() + 1,
          sender: 'ia',
          message: result.message,
        };


        setMessages(
          (previousMessages) => [
            ...previousMessages,
            newAIMessage,
          ]
        );
      }

    } catch (error) {

      console.error(
        'Erreur envoi message :',
        error
      );


      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: 'ia',
        message:
          'Une erreur est survenue pendant l’analyse. Veuillez réessayer.',
      };


      setMessages(
        (previousMessages) => [
          ...previousMessages,
          errorMessage,
        ]
      );

    } finally {

      setLoading(false);

    }
  };


  /*
   * Écran de démarrage du diagnostic
   */
  if (!diagnosticId) {

    return (
      <SafeAreaView style={styles.container}>

        <StatusBar
          barStyle="light-content"
          background-Color="#2E7D32"
        />


        {/* HEADER */}

        <View style={styles.header}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >

            <MaterialCommunityIcons
              name="arrow-left"
              size={26}
              color="#FFFFFF"
            />

          </TouchableOpacity>


          <View style={styles.headerContent}>

            <Text style={styles.headerTitle}>
              Nouveau diagnostic
            </Text>

            <Text style={styles.headerSubtitle}>
              Assistant agricole AgriChat
            </Text>

          </View>


          <View style={styles.headerIcon}>

            <MaterialCommunityIcons
              name="robot"
              size={28}
              color="#FFFFFF"
            />

          </View>

        </View>


        {/* CONTENU */}

        <View style={styles.startContainer}>

          <View style={styles.robotCircle}>

            <MaterialCommunityIcons
              name="robot"
              size={45}
              color="#2E7D32"
            />

          </View>


          <Text style={styles.startTitle}>
            Diagnostic de votre culture
          </Text>


          <Text style={styles.startText}>
            Pour commencer, indiquez la culture
            que vous souhaitez diagnostiquer.
          </Text>


          <TextInput
            style={styles.cultureInputLarge}
            value={culture}
            onChangeText={setCulture}
            placeholder="Ex : tomate, maïs, cacao..."
            placeholderTextColor="#999999"
          />


          <TouchableOpacity
            style={[
              styles.startButton,

              !culture.trim() &&
                styles.startButtonDisabled,
            ]}
            onPress={handleStartDiagnostic}
            disabled={
              !culture.trim() ||
              starting
            }
          >

            {starting ? (

              <ActivityIndicator
                size="small"
                color="#FFFFFF"
              />

            ) : (

              <>
                <MaterialCommunityIcons
                  name="stethoscope"
                  size={22}
                  color="#FFFFFF"
                />

                <Text style={styles.startButtonText}>
                  Commencer le diagnostic
                </Text>
              </>

            )}

          </TouchableOpacity>

        </View>

      </SafeAreaView>
    );
  }


  /*
   * Écran de discussion avec l'IA
   */
  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="light-content"
        background-Color="#2E7D32"
      />


      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >

          <MaterialCommunityIcons
            name="arrow-left"
            size={26}
            color="#FFFFFF"
          />

        </TouchableOpacity>


        <View style={styles.headerContent}>

          <Text style={styles.headerTitle}>
            Diagnostic IA
          </Text>

          <Text style={styles.headerSubtitle}>
            {culture}
          </Text>

        </View>


        <View style={styles.headerIcon}>

          <MaterialCommunityIcons
            name="robot"
            size={28}
            color="#FFFFFF"
          />

        </View>

      </View>


      {/* CHAT */}

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
        keyboardVerticalOffset={
          Platform.OS === 'ios'
            ? 90
            : 0
        }
      >

        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={
            styles.messagesContent
          }
          showsVerticalScrollIndicator={false}
        >

          {messages.map((item) => (

            <View
              key={item.id}
              style={
                item.sender === 'agriculteur'
                  ? styles.userMessageContainer
                  : styles.aiMessageContainer
              }
            >

              {item.sender === 'ia' && (

                <View style={styles.aiIcon}>

                  <MaterialCommunityIcons
                    name="robot"
                    size={20}
                    color="#2E7D32"
                  />

                </View>

              )}


              <View
                style={
                  item.sender === 'agriculteur'
                    ? styles.userMessage
                    : styles.aiMessage
                }
              >

                <Text
                  style={
                    item.sender === 'agriculteur'
                      ? styles.userMessageText
                      : styles.aiMessageText
                  }
                >
                  {item.message}
                </Text>

              </View>

            </View>

          ))}


          {loading && (

            <View style={styles.aiMessageContainer}>

              <View style={styles.aiIcon}>

                <MaterialCommunityIcons
                  name="robot"
                  size={20}
                  color="#2E7D32"
                />

              </View>


              <View style={styles.aiMessage}>

                <View style={styles.typingContainer}>

                  <ActivityIndicator
                    size="small"
                    color="#2E7D32"
                  />

                  <Text style={styles.typingText}>
                    Analyse en cours...
                  </Text>

                </View>

              </View>

            </View>

          )}

        </ScrollView>


        {/* ZONE DE SAISIE */}

        <View style={styles.inputContainer}>

          <TextInput
            style={styles.messageInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Décrivez les symptômes observés..."
            placeholderTextColor="#999999"
            multiline
            maxLength={1000}
          />


          <TouchableOpacity
            style={[
              styles.sendButton,

              !message.trim() &&
                styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={
              !message.trim() ||
              loading ||
              !diagnosticId
            }
          >

            <MaterialCommunityIcons
              name="send"
              size={23}
              color="#FFFFFF"
            />

          </TouchableOpacity>

        </View>


        {/* CONSEIL */}

        <View style={styles.infoContainer}>

          <MaterialCommunityIcons
            name="information-outline"
            size={18}
            color="#2E7D32"
          />

          <Text style={styles.infoText}>
            Décrivez précisément les symptômes :
            taches, couleur des feuilles, insectes,
            dessèchement, etc.
          </Text>

        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F8F5',
  },


  /* HEADER */

  header: {
    height: 75,
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },


  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },


  headerContent: {
    flex: 1,
    marginLeft: 8,
  },


  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },


  headerSubtitle: {
    color: '#E8F5E9',
    fontSize: 12,
    marginTop: 2,
  },


  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#388E3C',
    justifyContent: 'center',
    alignItems: 'center',
  },


  /* ÉCRAN DE DÉMARRAGE */

  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },


  robotCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },


  startTitle: {
    fontSize: 23,
    fontWeight: '700',
    color: '#222222',
    textAlign: 'center',
    marginBottom: 10,
  },


  startText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 25,
  },


  cultureInputLarge: {
    width: '100%',
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#222222',
    marginBottom: 15,
  },


  startButton: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },


  startButtonDisabled: {
    backgroundColor: '#A5C9A7',
  },


  startButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },


  /* CHAT */

  chatContainer: {
    flex: 1,
  },


  messagesContainer: {
    flex: 1,
  },


  messagesContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },


  aiMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 14,
  },


  userMessageContainer: {
    alignItems: 'flex-end',
    marginBottom: 14,
  },


  aiIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },


  aiMessage: {
    maxWidth: '82%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 11,
    elevation: 1,
  },


  userMessage: {
    maxWidth: '82%',
    backgroundColor: '#2E7D32',
    borderRadius: 15,
    borderBottomRightRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },


  aiMessageText: {
    fontSize: 15,
    lineHeight: 21,
    color: '#333333',
  },


  userMessageText: {
    fontSize: 15,
    lineHeight: 21,
    color: '#FFFFFF',
  },


  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },


  typingText: {
    marginLeft: 8,
    fontSize: 13,
    color: '#666666',
  },


  /* INPUT */

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },


  messageInput: {
    flex: 1,
    minHeight: 45,
    maxHeight: 110,
    backgroundColor: '#F5F5F5',
    borderRadius: 23,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontSize: 15,
    color: '#222222',
    marginRight: 8,
  },


  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
  },


  sendButtonDisabled: {
    backgroundColor: '#A5C9A7',
  },


  /* CONSEIL */

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 9,
  },


  infoText: {
    flex: 1,
    fontSize: 11,
    color: '#4F6F52',
    marginLeft: 7,
    lineHeight: 16,
  },

});


export default DiagnosticChatScreen;