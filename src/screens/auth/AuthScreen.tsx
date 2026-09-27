import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  registerUser,
  loginUser,
} from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

type AuthMode = 'login' | 'register';
type RegisterRole = 'agriculteur' | 'expert';

const AuthScreen = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const { login } = useAuth();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] =
    useState('');
  const [registerRole, setRegisterRole] =
    useState<RegisterRole>('agriculteur');

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogin = async () => {
  console.log('===== BOUTON CONNEXION CLIQUÉ =====');

  try {
      if (!loginEmail.trim() || !loginPassword.trim()) {
        Alert.alert(
          'Erreur',
          'Veuillez remplir tous les champs.',
        );
        return;
      }
      console.log('Tentative de connexion vers :', loginEmail.trim());
      const result = await loginUser({
        email: loginEmail.trim(),
        password: loginPassword,
      });
  await login(result.token, result.user);

Alert.alert(
  'Connexion réussie',
  `Bienvenue ${result.user.nom_complet}`,
);
     
    } catch (error: any) {
      Alert.alert(
        'Connexion',
        error.message || 'Impossible de se connecter.',
      );
    }
  };

  const handleRegister = async () => {
  console.log('===== BOUTON INSCRIPTION CLIQUÉ =====');

  try {
      if (
        !registerName.trim() ||
        !registerEmail.trim() ||
        !registerPhone.trim() ||
        !registerPassword ||
        !registerConfirmPassword
      ) {
        Alert.alert(
          'Champs obligatoires',
          'Veuillez remplir tous les champs.',
        );
        return;
      }

      if ( !registerName.trim() ||
            !registerEmail.trim() ||
            !registerPhone.trim() ||
            !registerPassword.trim()
     ) {
        Alert.alert(
          'Erreur de Mot de passe',
          'Veuillez remplir tous les champs.',
        );
        return;
      }

      if (registerPassword.length < 6) {
        Alert.alert(
          'Mot de passe',
          'Le mot de passe doit contenir au moins 6 caractères.',
        );
        return;
      }
      console.log('Tentative inscription :', registerEmail.trim());
      const result = await registerUser({
        nom_complet: registerName.trim(),
        email: registerEmail.trim(),
        telephone: registerPhone.trim(),
        password: registerPassword,
        role: registerRole,
      });

      console.log('Utilisateur créé :', result.user);
      console.log('JWT :', result.token);

      Alert.alert(
        'Compte créé',
        `Bienvenue ${result.user.nom_complet}`,
      );

      setMode('login');
      setLoginEmail(registerEmail.trim());

      setRegisterName('');
      setRegisterEmail('');
      setRegisterPhone('');
      setRegisterPassword('');
      setRegisterConfirmPassword('');
      setRegisterRole('agriculteur');
    } catch (error: any) {
      Alert.alert(
        'Création du compte',
        error.message || 'Impossible de créer le compte.',
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons
              name="sprout"
              size={48}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.appName}>AgriChat</Text>

          <Text style={styles.subtitle}>
            Votre assistant intelligent pour une agriculture plus performante
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.switchContainer}>
            <TouchableOpacity
              style={[
                styles.switchButton,
                mode === 'login' && styles.switchButtonActive,
              ]}
              onPress={() => setMode('login')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.switchText,
                  mode === 'login' && styles.switchTextActive,
                ]}
              >
                Connexion
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.switchButton,
                mode === 'register' && styles.switchButtonActive,
              ]}
              onPress={() => setMode('register')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.switchText,
                  mode === 'register' && styles.switchTextActive,
                ]}
              >
                Créer un compte
              </Text>
            </TouchableOpacity>
          </View>

          {mode === 'login' ? (
            <View>
              <Text style={styles.title}>Bienvenue !</Text>

              <Text style={styles.description}>
                Connectez-vous à votre espace AgriChat.
              </Text>

              <Text style={styles.label}>Adresse e-mail</Text>

              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={22}
                  color="#6B7280"
                  style={styles.inputIcon}
                />

                <TextInput
                  style={styles.input}
                  placeholder="exemple@email.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={loginEmail}
                  onChangeText={setLoginEmail}
                />
              </View>

              <Text style={styles.label}>Mot de passe</Text>

              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={22}
                  color="#6B7280"
                  style={styles.inputIcon}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Votre mot de passe"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showLoginPassword}
                  value={loginPassword}
                  onChangeText={setLoginPassword}
                />

                <TouchableOpacity
                  onPress={() =>
                    setShowLoginPassword(!showLoginPassword)
                  }
                  style={styles.eyeButton}
                >
                  <MaterialCommunityIcons
                    name={
                      showLoginPassword
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={22}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.forgotButton}
                onPress={() =>
                  Alert.alert(
                    'Mot de passe oublié',
                    'La récupération du mot de passe sera ajoutée prochainement.',
                  )
                }
              >
                <Text style={styles.forgotText}>
                  Mot de passe oublié ?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleLogin}
                activeOpacity={0.85}
              >
                <MaterialCommunityIcons
                  name="login"
                  size={22}
                  color="#FFFFFF"
                />

                <Text style={styles.primaryButtonText}>
                  Se connecter
                </Text>
              </TouchableOpacity>

              <View style={styles.separatorContainer}>
                <View style={styles.separator} />

                <Text style={styles.separatorText}>ou</Text>

                <View style={styles.separator} />
              </View>

              <Text style={styles.bottomText}>
                Vous n'avez pas encore de compte ?
              </Text>

              <TouchableOpacity
                onPress={() => setMode('register')}
              >
                <Text style={styles.createAccountText}>
                  Créer un compte
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={styles.title}>Créer un compte</Text>

              <Text style={styles.description}>
                Rejoignez AgriChat et profitez d'un accompagnement
                agricole intelligent.
              </Text>

              <Text style={styles.label}>Nom complet</Text>

              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="account-outline"
                  size={22}
                  color="#6B7280"
                  style={styles.inputIcon}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Votre nom complet"
                  placeholderTextColor="#9CA3AF"
                  value={registerName}
                  onChangeText={setRegisterName}
                />
              </View>

              <Text style={styles.label}>Adresse e-mail</Text>

              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={22}
                  color="#6B7280"
                  style={styles.inputIcon}
                />

                <TextInput
                  style={styles.input}
                  placeholder="exemple@email.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={registerEmail}
                  onChangeText={setRegisterEmail}
                />
              </View>

              <Text style={styles.label}>Numéro de téléphone</Text>

              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="phone-outline"
                  size={22}
                  color="#6B7280"
                  style={styles.inputIcon}
                />

                <TextInput
                  style={styles.input}
                  placeholder="6XX XXX XXX"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  value={registerPhone}
                  onChangeText={setRegisterPhone}
                />
              </View>

              <View style={styles.roleSection}>
                <Text style={styles.roleTitle}>
                  Je suis :
                </Text>

                <View style={styles.roleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.roleButton,
                      registerRole === 'agriculteur' &&
                        styles.roleButtonSelected,
                    ]}
                    onPress={() =>
                      setRegisterRole('agriculteur')
                    }
                    activeOpacity={0.8}
                  >
                    <MaterialCommunityIcons
                      name="sprout"
                      size={25}
                      color={
                        registerRole === 'agriculteur'
                          ? '#FFFFFF'
                          : '#2E7D32'
                      }
                    />

                    <Text
                      style={[
                        styles.roleText,
                        registerRole === 'agriculteur' &&
                          styles.roleTextSelected,
                      ]}
                    >
                      Agriculteur
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.roleButton,
                      registerRole === 'expert' &&
                        styles.roleButtonSelected,
                    ]}
                    onPress={() =>
                      setRegisterRole('expert')
                    }
                    activeOpacity={0.8}
                  >
                    <MaterialCommunityIcons
                      name="account-tie"
                      size={25}
                      color={
                        registerRole === 'expert'
                          ? '#FFFFFF'
                          : '#2E7D32'
                      }
                    />

                    <Text
                      style={[
                        styles.roleText,
                        registerRole === 'expert' &&
                          styles.roleTextSelected,
                      ]}
                    >
                      Expert agricole
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.label}>Mot de passe</Text>

              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={22}
                  color="#6B7280"
                  style={styles.inputIcon}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Minimum 6 caractères"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showRegisterPassword}
                  value={registerPassword}
                  onChangeText={setRegisterPassword}
                />

                <TouchableOpacity
                  onPress={() =>
                    setShowRegisterPassword(
                      !showRegisterPassword,
                    )
                  }
                  style={styles.eyeButton}
                >
                  <MaterialCommunityIcons
                    name={
                      showRegisterPassword
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={22}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>
                Confirmer le mot de passe
              </Text>

              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="lock-check-outline"
                  size={22}
                  color="#6B7280"
                  style={styles.inputIcon}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Confirmez votre mot de passe"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showConfirmPassword}
                  value={registerConfirmPassword}
                  onChangeText={setRegisterConfirmPassword}
                />

                <TouchableOpacity
                  onPress={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword,
                    )
                  }
                  style={styles.eyeButton}
                >
                  <MaterialCommunityIcons
                    name={
                      showConfirmPassword
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={22}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleRegister}
                activeOpacity={0.85}
              >
                <MaterialCommunityIcons
                  name="account-plus-outline"
                  size={23}
                  color="#FFFFFF"
                />

                <Text style={styles.primaryButtonText}>
                  Créer mon compte
                </Text>
              </TouchableOpacity>

              <Text style={styles.bottomText}>
                Vous avez déjà un compte ?
              </Text>

              <TouchableOpacity
                onPress={() => setMode('login')}
              >
                <Text style={styles.createAccountText}>
                  Se connecter
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text style={styles.footerText}>
          AgriChat • Agriculture intelligente
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8F3',
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 35,
  },

  header: {
    alignItems: 'center',
    marginBottom: 25,
  },

  logoContainer: {
    width: 78,
    height: 78,
    borderRadius: 24,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },

  appName: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1B5E20',
    marginBottom: 7,
  },

  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 310,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  switchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F4EF',
    borderRadius: 13,
    padding: 4,
    marginBottom: 25,
  },

  switchButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  switchButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  switchText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7A837A',
  },

  switchTextActive: {
    color: '#2E7D32',
    fontWeight: '800',
  },

  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 7,
  },

  description: {
    fontSize: 13,
    lineHeight: 19,
    color: '#737B74',
    marginBottom: 22,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
    marginTop: 4,
  },

  inputContainer: {
    height: 53,
    borderWidth: 1,
    borderColor: '#E0E5DF',
    backgroundColor: '#FAFCF9',
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  inputIcon: {
    marginLeft: 14,
    marginRight: 9,
  },

  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#1F2937',
    paddingHorizontal: 4,
  },

  eyeButton: {
    paddingHorizontal: 14,
    height: '100%',
    justifyContent: 'center',
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -4,
    marginBottom: 20,
  },

  forgotText: {
    color: '#2E7D32',
    fontSize: 13,
    fontWeight: '700',
  },

  primaryButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    shadowColor: '#2E7D32',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 7,
    elevation: 4,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
  },

  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  separatorText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginHorizontal: 12,
  },

  roleSection: {
    marginBottom: 12,
  },

  roleTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },

  roleContainer: {
    flexDirection: 'row',
     justifyContent: 'space-between',
    gap: 10,
  },

  roleButton: {
    flex: 1,
    minHeight: 60,
    borderWidth: 1.3,
    borderColor: '#E0E5DF',
    borderRadius: 14,
    backgroundColor: '#FAFCF9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    gap: 8,
  },

  roleButtonSelected: {
    borderColor: '#2E7D32',
    backgroundColor: '#2E7D32',
  },

  roleText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2E7D32',
    textAlign: 'center',
    marginLeft: 7,
  },

  roleTextSelected: {
    color: '#FFFFFF',
  },

  bottomText: {
    textAlign: 'center',
    color: '#7A837A',
    fontSize: 13,
    marginTop: 20,
    marginBottom: 6,
  },

  createAccountText: {
    textAlign: 'center',
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '800',
  },

  footerText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 11,
    marginTop: 25,
  },
  
});