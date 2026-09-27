
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
const FarmerHomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
   const { logout } = useAuth();
   const navigation = useNavigation<any>();
   const handleLogout = async () => {
    setMenuVisible(false);
    await logout();
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        background-Color="#2E7D32"
      />

      {/* EN-TÊTE */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setMenuVisible(!menuVisible)}
        >
          <MaterialIcons
            name="menu"
            size={28}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>AgriChat</Text>
          <Text style={styles.headerSubtitle}>Espace Agriculteur</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialIcons
              name="notifications-none"
              size={27}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileButton}>
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={30}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* CARTE DE BIENVENUE */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeIcon}>
            <MaterialCommunityIcons
              name="sprout"
              size={38}
              color="#2E7D32"
            />
          </View>

          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>
              Bonjour, Agriculteur
            </Text>

            <Text style={styles.welcomeText}>
              Suivez vos cultures et obtenez rapidement
              des conseils pour protéger vos récoltes.
            </Text>
          </View>
        </View>

        {/* DIAGNOSTIC */}
        <TouchableOpacity
            style={styles.diagnosticButton}
             onPress={() => navigation.navigate('DiagnosticChat')}
        >
          <View style={styles.diagnosticIcon}>
            <MaterialCommunityIcons
              name="leaf-search"
              size={36}
              color="#FFFFFF"
            />
          </View>

          <View style={styles.diagnosticContent}>
            <Text style={styles.diagnosticTitle}>
              Diagnostiquer une culture
            </Text>

            <Text style={styles.diagnosticText}>
              Décrivez les symptômes de votre culture
              pour obtenir une aide au diagnostic.
            </Text>

            <View style={styles.diagnosticButton}>
              <Text style={styles.diagnosticButtonText}>
                Commencer
              </Text>

              <MaterialIcons
                name="arrow-forward"
                size={20}
                color="#2E7D32"
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* ACTIONS RAPIDES */}
        <Text style={styles.sectionTitle}>
          Actions rapides
        </Text>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <MaterialCommunityIcons
                name="leaf"
                size={28}
                color="#2E7D32"
              />
            </View>

            <Text style={styles.actionTitle}>
              Diagnostiquer
            </Text>

            <Text style={styles.actionText}>
              Identifier une maladie
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <MaterialCommunityIcons
                name="sprout"
                size={28}
                color="#2E7D32"
              />
            </View>

            <Text style={styles.actionTitle}>
              Mes cultures
            </Text>

            <Text style={styles.actionText}>
              Gérer mes cultures
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <MaterialCommunityIcons
                name="chart-line"
                size={28}
                color="#2E7D32"
              />
            </View>

            <Text style={styles.actionTitle}>
              Suivi
            </Text>

            <Text style={styles.actionText}>
              Suivre l'évolution
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <MaterialCommunityIcons
                name="account-tie"
                size={28}
                color="#2E7D32"
              />
            </View>

            <Text style={styles.actionTitle}>
              Expert
            </Text>

            <Text style={styles.actionText}>
              Contacter un expert
            </Text>
          </TouchableOpacity>
        </View>

        {/* ACTIVITÉ RÉCENTE */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Activité récente
          </Text>

          <TouchableOpacity>
            <Text style={styles.seeAll}>
              Voir tout
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emptyCard}>
          <MaterialCommunityIcons
            name="clipboard-text-outline"
            size={42}
            color="#A5BFA7"
          />

          <Text style={styles.emptyTitle}>
            Aucune activité récente
          </Text>

          <Text style={styles.emptyText}>
            Vos diagnostics et observations
            apparaîtront ici.
          </Text>
        </View>
      </ScrollView>

      {/* MENU LATÉRAL */}
      {menuVisible && (
        <>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
          />

          <View style={styles.sideMenu}>
            <View style={styles.menuHeader}>
              <MaterialCommunityIcons
                name="account-circle"
                size={52}
                color="#2E7D32"
              />

              <View style={styles.menuUser}>
                <Text style={styles.menuUserName}>
                  Agriculteur
                </Text>

                <Text style={styles.menuUserRole}>
                  Espace Agriculteur
                </Text>
              </View>
            </View>

            <View style={styles.menuSeparator} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setMenuVisible(false)}
            >
              <MaterialIcons
                name="home"
                size={24}
                color="#2E7D32"
              />

              <Text style={styles.menuItemText}>
                Accueil
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <MaterialCommunityIcons
                name="sprout"
                size={24}
                color="#2E7D32"
              />

              <Text style={styles.menuItemText}>
                Mes cultures
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <MaterialCommunityIcons
                name="stethoscope"
                size={24}
                color="#2E7D32"
              />

              <Text style={styles.menuItemText}>
                Mes diagnostics
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <MaterialCommunityIcons
                name="account-tie"
                size={24}
                color="#2E7D32"
              />

              <Text style={styles.menuItemText}>
                Experts agricoles
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <MaterialCommunityIcons
                name="message-text-outline"
                size={24}
                color="#2E7D32"
              />

              <Text style={styles.menuItemText}>
                Messages
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <MaterialCommunityIcons
                name="cart-outline"
                size={24}
                color="#2E7D32"
              />

              <Text style={styles.menuItemText}>
                Gérer son abonnement
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <MaterialIcons
                name="notifications-none"
                size={24}
                color="#2E7D32"
              />

              <Text style={styles.menuItemText}>
                Notifications
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <MaterialIcons
                name="person-outline"
                size={24}
                color="#2E7D32"
              />

              <Text style={styles.menuItemText}>
                Mon profil
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <MaterialCommunityIcons
                name="help-circle-outline"
                size={24}
                color="#2E7D32"
              />

              <Text style={styles.menuItemText}>
                Aide ?
              </Text>
            </TouchableOpacity>

            <View style={styles.menuSeparator} />

            <TouchableOpacity style={styles.menuItem}>
              <MaterialIcons
                name="settings"
                size={24}
                color="#2E7D32"
              />

              <Text style={styles.menuItemText}>
                Paramètres
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
  style={styles.menuItem}
  onPress={handleLogout}
>
  <MaterialIcons
    name="logout"
    size={24}
    color="#D32F2F"
  />

  <Text
    style={[
      styles.menuItemText,
      styles.logoutText,
    ]}
  >
    Déconnexion
  </Text>
</TouchableOpacity>
          </View>
        </>
      )}

      {/* NAVIGATION BASSE */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.bottomItem}>
          <MaterialIcons
            name="home"
            size={25}
            color="#2E7D32"
          />

          <Text style={styles.bottomItemActive}>
            Accueil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomItem}>
          <MaterialCommunityIcons
            name="sprout"
            size={25}
            color="#777777"
          />

          <Text style={styles.bottomItemText}>
            Cultures
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomItem}>
          <MaterialCommunityIcons
            name="message-text-outline"
            size={25}
            color="#777777"
          />

          <Text style={styles.bottomItemText}>
            Messages
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomItem}>
          <MaterialIcons
            name="person-outline"
            size={25}
            color="#777777"
          />

          <Text style={styles.bottomItemText}>
            Profil
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>




  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAF7',
  },

  header: {
    height: 72,
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 4,
  },

  headerButton: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitleContainer: {
    flex: 1,
    marginLeft: 8,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
  },

  headerSubtitle: {
    color: '#DDEEDD',
    fontSize: 12,
    marginTop: 2,
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileButton: {
    marginLeft: 2,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },

  welcomeCard: {
    backgroundColor: '#308834',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },

  welcomeIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcomeTextContainer: {
    flex: 1,
    marginLeft: 14,
  
  },

  welcomeTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 5,
  },

  welcomeText: {
    fontSize: 13,
    color: '#7a7979',
    lineHeight: 19,
  },

  diagnosticCard: {
    backgroundColor: '#fafdfa',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    marginBottom: 22,
    elevation: 3,
  },

  diagnosticIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(39, 179, 46, 0.14)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  diagnosticContent: {
    flex: 1,
  },

  diagnosticTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 5,
  },

  diagnosticText: {
    color: '#E8F5E9',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },

  diagnosticButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#228b39',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  diagnosticButtonText: {
    color: '#2E7D32',
    fontWeight: '700',
    marginRight: 5,
  },

  sectionTitle: {
    color: '#1B5E20',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },

  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },

  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  actionTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },

  actionText: {
    color: '#777777',
    fontSize: 12,
    lineHeight: 17,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  seeAll: {
    color: '#2E7D32',
    fontSize: 13,
    fontWeight: '600',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    marginBottom: 15,
  },

  emptyTitle: {
    color: '#555555',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
  },

  emptyText: {
    color: '#888888',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
    lineHeight: 19,
  },

  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
  },

  bottomItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
  },

  bottomItemActive: {
    color: '#2E7D32',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 3,
  },

  bottomItemText: {
    color: '#777777',
    fontSize: 11,
    marginTop: 3,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    zIndex: 10,
  },

  sideMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '82%',
    backgroundColor: '#FFFFFF',
    zIndex: 11,
    paddingTop: 45,
    paddingHorizontal: 18,
    elevation: 12,
  },

  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },

  menuUser: {
    marginLeft: 12,
  },

  menuUserName: {
    color: '#222222',
    fontSize: 17,
    fontWeight: '700',
  },

  menuUserRole: {
    color: '#777777',
    fontSize: 12,
    marginTop: 3,
  },

  menuSeparator: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 8,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },

  menuItemText: {
    color: '#444444',
    fontSize: 14,
    marginLeft: 14,
    fontWeight: '500',
  },

  logoutText: {
    color: '#D32F2F',
  },
});

export default FarmerHomeScreen;