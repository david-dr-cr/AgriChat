/*import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAuth } from '../../context/AuthContext';

const AdminHomeScreen = () => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Administration
          </Text>

          <Text style={styles.subtitle}>
            AgriChat
          </Text>
        </View>

        <MaterialCommunityIcons
          name="shield-account"
          size={42}
          color="#2E7D32"
        />
      </View>

      <View style={styles.welcomeCard}>
        <MaterialCommunityIcons
          name="account-circle"
          size={55}
          color="#2E7D32"
        />

        <View style={styles.welcomeText}>
          <Text style={styles.welcomeTitle}>
            Bienvenue
          </Text>

          <Text style={styles.name}>
            {user?.nom_complet}
          </Text>

          <Text style={styles.role}>
            Administrateur
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          Tableau de bord
        </Text>

        <View style={styles.card}>
          <MaterialCommunityIcons
            name="account-group"
            size={32}
            color="#2E7D32"
          />

          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>
              Gestion des utilisateurs
            </Text>

            <Text style={styles.cardDescription}>
              Gérer les agriculteurs et les experts.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <MaterialCommunityIcons
            name="book-open-page-variant"
            size={32}
            color="#2E7D32"
          />

          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>
              Base de connaissances
            </Text>

            <Text style={styles.cardDescription}>
              Gérer les informations agricoles.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <MaterialCommunityIcons
            name="chart-line"
            size={32}
            color="#2E7D32"
          />

          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>
              Statistiques
            </Text>

            <Text style={styles.cardDescription}>
              Consulter les statistiques de la plateforme.
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
      >
        <MaterialCommunityIcons
          name="logout"
          size={22}
          color="#FFFFFF"
        />

        <Text style={styles.logoutText}>
          Déconnexion
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAF7',
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1B5E20',
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 3,
  },

  welcomeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 18,
    padding: 18,
    marginBottom: 25,
  },

  welcomeText: {
    marginLeft: 15,
  },

  welcomeTitle: {
    fontSize: 13,
    color: '#6B7280',
  },

  name: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1B5E20',
    marginTop: 2,
  },

  role: {
    fontSize: 13,
    color: '#2E7D32',
    marginTop: 3,
    fontWeight: '600',
  },

  content: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#263238',
    marginBottom: 15,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E3EAE3',
  },

  cardText: {
    flex: 1,
    marginLeft: 15,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#263238',
  },

  cardDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },

  logoutButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  logoutText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
});

export default AdminHomeScreen;
*/
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');

const AdminHomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const { user, logout } = useAuth();

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

      {/* ==================== EN-TÊTE ==================== */}

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={styles.menuButton}
        >
          <MaterialCommunityIcons
            name="menu"
            size={30}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          AgriChat
        </Text>

        <TouchableOpacity
          style={styles.notificationButton}
        >
          <MaterialCommunityIcons
            name="bell-outline"
            size={25}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileButton}
        >
          <MaterialCommunityIcons
            name="shield-account-outline"
            size={27}
            color="#FFFFFF"
          />
        </TouchableOpacity>

      </View>

      {/* ==================== CONTENU ==================== */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* ==================== BIENVENUE ==================== */}

        <View style={styles.welcomeCard}>

          <View>
            <Text style={styles.welcomeTitle}>
              Bonjour, Administrateur
            </Text>

            <Text style={styles.welcomeText}>
              Bienvenue dans votre espace
              d'administration AgriChat.
            </Text>
          </View>

          <MaterialCommunityIcons
            name="shield-account"
            size={48}
            color="#FFFFFF"
            style={styles.welcomeIcon}
          />

        </View>

        {/* ==================== UTILISATEURS ==================== */}

        <TouchableOpacity style={styles.requestCard}>

          <View style={styles.cardIconContainer}>
            <MaterialCommunityIcons
              name="account-group-outline"
              size={28}
              color="#2E7D32"
            />
          </View>

          <View style={styles.cardContent}>

            <Text style={styles.cardTitle}>
              Gestion des utilisateurs
            </Text>

            <Text style={styles.cardDescription}>
              Gérer les agriculteurs et les experts
            </Text>

          </View>

          <MaterialIcons
            name="chevron-right"
            size={28}
            color="#78909C"
          />

        </TouchableOpacity>

        {/* ==================== STATISTIQUES ==================== */}

        <View style={styles.statsContainer}>

          <TouchableOpacity style={styles.statCard}>

            <MaterialCommunityIcons
              name="account-group-outline"
              size={32}
              color="#2E7D32"
            />

            <Text style={styles.statNumber}>
              0
            </Text>

            <Text style={styles.statLabel}>
              Utilisateurs
            </Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.statCard}>

            <MaterialCommunityIcons
              name="account-tie-outline"
              size={32}
              color="#2E7D32"
            />

            <Text style={styles.statNumber}>
              0
            </Text>

            <Text style={styles.statLabel}>
              Experts
            </Text>

          </TouchableOpacity>

        </View>

        {/* ==================== ACTIVITÉS ==================== */}

        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Gestion de la plateforme
          </Text>

          <TouchableOpacity>
            <Text style={styles.seeAll}>
              Voir tout
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.activityCard}>

          {/* Base de connaissances */}

          <TouchableOpacity style={styles.activityItem}>

            <View style={styles.activityIconContainer}>
              <MaterialCommunityIcons
                name="book-open-outline"
                size={28}
                color="#2E7D32"
              />
            </View>

            <View style={styles.activityInfo}>

              <Text style={styles.activityTitle}>
                Base de connaissances
              </Text>

              <Text style={styles.activityText}>
                Gérer les maladies et informations agricoles
              </Text>

            </View>

            <MaterialIcons
              name="chevron-right"
              size={28}
              color="#78909C"
            />

          </TouchableOpacity>

          <View style={styles.separator} />

          {/* Diagnostics */}

          <TouchableOpacity style={styles.activityItem}>

            <View style={styles.activityIconContainer}>
              <MaterialCommunityIcons
                name="stethoscope"
                size={28}
                color="#2E7D32"
              />
            </View>

            <View style={styles.activityInfo}>

              <Text style={styles.activityTitle}>
                Diagnostics
              </Text>

              <Text style={styles.activityText}>
                Consulter les diagnostics réalisés
              </Text>

            </View>

            <MaterialIcons
              name="chevron-right"
              size={28}
              color="#78909C"
            />

          </TouchableOpacity>

          <View style={styles.separator} />

          {/* Statistiques */}

          <TouchableOpacity style={styles.activityItem}>

            <View style={styles.activityIconContainer}>
              <MaterialCommunityIcons
                name="chart-line"
                size={28}
                color="#2E7D32"
              />
            </View>

            <View style={styles.activityInfo}>

              <Text style={styles.activityTitle}>
                Statistiques
              </Text>

              <Text style={styles.activityText}>
                Consulter les statistiques de la plateforme
              </Text>

            </View>

            <MaterialIcons
              name="chevron-right"
              size={28}
              color="#78909C"
            />

          </TouchableOpacity>

          <View style={styles.separator} />

          {/* Notifications */}

          <TouchableOpacity style={styles.activityItem}>

            <View style={styles.activityIconContainer}>
              <MaterialCommunityIcons
                name="bell-outline"
                size={28}
                color="#2E7D32"
              />
            </View>

            <View style={styles.activityInfo}>

              <Text style={styles.activityTitle}>
                Notifications
              </Text>

              <Text style={styles.activityText}>
                Gérer les notifications de la plateforme
              </Text>

            </View>

            <MaterialIcons
              name="chevron-right"
              size={28}
              color="#78909C"
            />

          </TouchableOpacity>

        </View>

        {/* ==================== ADMINISTRATEUR ==================== */}

        <View style={styles.adminInfoCard}>

          <MaterialCommunityIcons
            name="shield-check-outline"
            size={36}
            color="#2E7D32"
          />

          <View style={styles.adminInfoText}>

            <Text style={styles.adminInfoTitle}>
              Compte administrateur
            </Text>

            <Text style={styles.adminInfoDescription}>
              {user?.email || 'Administrateur AgriChat'}
            </Text>

          </View>

        </View>

      </ScrollView>

      {/* ==================== NAVIGATION BASSE ==================== */}

      <View style={styles.bottomNavigation}>

        <TouchableOpacity style={styles.navItem}>

          <MaterialCommunityIcons
            name="home"
            size={24}
            color="#2E7D32"
          />

          <Text style={styles.navTextActive}>
            Accueil
          </Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>

          <MaterialCommunityIcons
            name="account-group-outline"
            size={24}
            color="#78909C"
          />

          <Text style={styles.navText}>
            Utilisateurs
          </Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>

          <MaterialCommunityIcons
            name="book-open-outline"
            size={24}
            color="#78909C"
          />

          <Text style={styles.navText}>
            Connaissances
          </Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>

          <MaterialCommunityIcons
            name="account-outline"
            size={24}
            color="#78909C"
          />

          <Text style={styles.navText}>
            Profil
          </Text>

        </TouchableOpacity>

      </View>

      {/* ==================== MENU LATÉRAL ==================== */}

      {menuVisible && (

        <View style={styles.menuOverlay}>

          {/* Zone extérieure */}

          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
          />

          {/* Menu */}

          <View style={styles.sideMenu}>

            {/* En-tête du menu */}

            <View style={styles.menuHeader}>

              <MaterialCommunityIcons
                name="shield-account"
                size={42}
                color="#FFFFFF"
              />

              <Text style={styles.menuTitle}>
                AgriChat
              </Text>

              <Text style={styles.menuSubtitle}>
                Espace Administrateur
              </Text>

            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
            >

              {/* Mon profil */}

              <TouchableOpacity
                style={styles.menuItem}
              >

                <MaterialCommunityIcons
                  name="account-outline"
                  size={24}
                  color="#2E7D32"
                />

                <Text style={styles.menuItemText}>
                  Mon profil
                </Text>

              </TouchableOpacity>

              {/* Accueil */}

              <TouchableOpacity
                style={styles.menuItem}
              >

                <MaterialCommunityIcons
                  name="home-outline"
                  size={24}
                  color="#2E7D32"
                />

                <Text style={styles.menuItemText}>
                  Accueil
                </Text>

              </TouchableOpacity>

              {/* Utilisateurs */}

              <TouchableOpacity
                style={styles.menuItem}
              >

                <MaterialCommunityIcons
                  name="account-group-outline"
                  size={24}
                  color="#2E7D32"
                />

                <Text style={styles.menuItemText}>
                  Gestion des utilisateurs
                </Text>

              </TouchableOpacity>

              {/* Agriculteurs */}

              <TouchableOpacity
                style={styles.menuItem}
              >

                <MaterialCommunityIcons
                  name="sprout-outline"
                  size={24}
                  color="#2E7D32"
                />

                <Text style={styles.menuItemText}>
                  Agriculteurs
                </Text>

              </TouchableOpacity>

              {/* Experts */}

              <TouchableOpacity
                style={styles.menuItem}
              >

                <MaterialCommunityIcons
                  name="account-tie-outline"
                  size={24}
                  color="#2E7D32"
                />

                <Text style={styles.menuItemText}>
                  Experts agricoles
                </Text>

              </TouchableOpacity>

              {/* Diagnostics */}

              <TouchableOpacity
                style={styles.menuItem}
              >

                <MaterialCommunityIcons
                  name="stethoscope"
                  size={24}
                  color="#2E7D32"
                />

                <Text style={styles.menuItemText}>
                  Diagnostics
                </Text>

              </TouchableOpacity>

              {/* Base de connaissances */}

              <TouchableOpacity
                style={styles.menuItem}
              >

                <MaterialCommunityIcons
                  name="book-open-outline"
                  size={24}
                  color="#2E7D32"
                />

                <Text style={styles.menuItemText}>
                  Base de connaissances
                </Text>

              </TouchableOpacity>

              {/* Statistiques */}

              <TouchableOpacity
                style={styles.menuItem}
              >

                <MaterialCommunityIcons
                  name="chart-line"
                  size={24}
                  color="#2E7D32"
                />

                <Text style={styles.menuItemText}>
                  Statistiques
                </Text>

              </TouchableOpacity>

              {/* Notifications */}

              <TouchableOpacity
                style={styles.menuItem}
              >

                <MaterialCommunityIcons
                  name="bell-outline"
                  size={24}
                  color="#2E7D32"
                />

                <Text style={styles.menuItemText}>
                  Notifications
                </Text>

              </TouchableOpacity>

              {/* Paramètres */}

              <TouchableOpacity
                style={styles.menuItem}
              >

                <MaterialCommunityIcons
                  name="cog-outline"
                  size={24}
                  color="#2E7D32"
                />

                <Text style={styles.menuItemText}>
                  Paramètres
                </Text>

              </TouchableOpacity>

              <View style={styles.menuSeparator} />

              {/* Déconnexion */}

              <TouchableOpacity
                style={styles.logoutItem}
                onPress={handleLogout}
              >

                <MaterialCommunityIcons
                  name="logout"
                  size={24}
                  color="#D32F2F"
                />

                <Text style={styles.logoutText}>
                  Déconnexion
                </Text>

              </TouchableOpacity>

            </ScrollView>

          </View>

        </View>

      )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F8F5',
  },

  /* ================= HEADER ================= */

  header: {
    height: 65,
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  menuButton: {
    width: 40,
    alignItems: 'flex-start',
  },

  headerTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
  },

  notificationButton: {
    marginRight: 15,
  },

  profileButton: {
    marginLeft: 3,
  },

  /* ================= CONTENU ================= */

  content: {
    padding: 16,
    paddingBottom: 25,
  },

  /* ================= BIENVENUE ================= */

  welcomeCard: {
    backgroundColor: '#2E7D32',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  welcomeText: {
    color: '#E8F5E9',
    fontSize: 14,
    lineHeight: 20,
    width: width * 0.65,
  },

  welcomeIcon: {
    marginLeft: 'auto',
  },

  /* ================= CARTE UTILISATEURS ================= */

  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    elevation: 3,
  },

  cardIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardContent: {
    flex: 1,
    marginLeft: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
  },

  cardDescription: {
    fontSize: 12,
    color: '#78909C',
    marginTop: 4,
  },

  /* ================= STATISTIQUES ================= */

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    elevation: 2,
  },

  statNumber: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 5,
  },

  statLabel: {
    color: '#607D8B',
    marginTop: 3,
  },

  /* ================= SECTION ================= */

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#263238',
  },

  seeAll: {
    color: '#2E7D32',
    fontWeight: '600',
  },

  /* ================= ACTIVITÉS ================= */

  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    elevation: 2,
  },

  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },

  activityIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#F1F8E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  activityInfo: {
    flex: 1,
  },

  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
  },

  activityText: {
    color: '#78909C',
    fontSize: 13,
    marginTop: 3,
  },

  separator: {
    height: 1,
    backgroundColor: '#ECEFF1',
  },

  /* ================= ADMIN INFO ================= */

  adminInfoCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 15,
    padding: 16,
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  adminInfoText: {
    flex: 1,
    marginLeft: 12,
  },

  adminInfoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  adminInfoDescription: {
    fontSize: 12,
    color: '#607D8B',
    marginTop: 4,
  },

  /* ================= NAVIGATION BASSE ================= */

  bottomNavigation: {
    height: 70,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  navText: {
    fontSize: 11,
    color: '#78909C',
    marginTop: 3,
  },

  navTextActive: {
    fontSize: 11,
    color: '#2E7D32',
    fontWeight: 'bold',
    marginTop: 3,
  },

  /* ================= MENU ================= */

  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  sideMenu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.82,
    backgroundColor: '#FFFFFF',
    elevation: 10,
  },

  menuHeader: {
    backgroundColor: '#2E7D32',
    paddingTop: 45,
    paddingBottom: 22,
    paddingHorizontal: 20,
  },

  menuTitle: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 5,
  },

  menuSubtitle: {
    color: '#E8F5E9',
    marginTop: 4,
    fontSize: 13,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  menuItemText: {
    fontSize: 15,
    color: '#263238',
    marginLeft: 15,
  },

  menuSeparator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },

  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  logoutText: {
    fontSize: 15,
    color: '#D32F2F',
    fontWeight: '600',
    marginLeft: 15,
  },

});

export default AdminHomeScreen;