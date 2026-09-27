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

const { width } = Dimensions.get('window');

const ExpertHomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);

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

        <TouchableOpacity style={styles.notificationButton}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={25}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton}>
          <MaterialCommunityIcons
            name="account-circle-outline"
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
              Bonjour, Expert
            </Text>

            <Text style={styles.welcomeText}>
              Bienvenue dans votre espace
              d'accompagnement agricole.
            </Text>
          </View>

          <MaterialCommunityIcons
            name="sprout"
            size={48}
            color="#FFFFFF"
            style={styles.welcomeIcon}
          />

        </View>

        {/* ==================== DEMANDES D'EXPERTISE ==================== */}
        <TouchableOpacity style={styles.requestCard}>

          <View style={styles.cardIconContainer}>
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={28}
              color="#2E7D32"
            />
          </View>

          <View style={styles.cardContent}>

            <Text style={styles.cardTitle}>
              Demandes d'expertise
            </Text>

            <Text style={styles.cardDescription}>
              Consultez les demandes des agriculteurs
            </Text>

          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              5
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

          {/* Agriculteurs */}
          <TouchableOpacity style={styles.statCard}>

            <MaterialCommunityIcons
              name="account-group-outline"
              size={32}
              color="#2E7D32"
            />

            <Text style={styles.statNumber}>
              12
            </Text>

            <Text style={styles.statLabel}>
              Agriculteurs
            </Text>

          </TouchableOpacity>

          {/* Messages */}
          <TouchableOpacity style={styles.statCard}>

            <MaterialCommunityIcons
              name="message-text-outline"
              size={32}
              color="#2E7D32"
            />

            <Text style={styles.statNumber}>
              8
            </Text>

            <Text style={styles.statLabel}>
              Messages
            </Text>

          </TouchableOpacity>

        </View>

        {/* ==================== DIAGNOSTICS RÉCENTS ==================== */}
        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Diagnostics récents
          </Text>

          <TouchableOpacity>
            <Text style={styles.seeAll}>
              Voir tout
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.diagnosticCard}>

          {/* Maïs */}
          <TouchableOpacity style={styles.diagnosticItem}>

            <View style={styles.cropIconContainer}>
              <MaterialCommunityIcons
                name="corn"
                size={28}
                color="#8D6E63"
              />
            </View>

            <View style={styles.diagnosticInfo}>

              <Text style={styles.cropName}>
                Maïs
              </Text>

              <Text style={styles.diagnosticText}>
                Maladie suspectée
              </Text>

            </View>

            <MaterialIcons
              name="chevron-right"
              size={28}
              color="#78909C"
            />

          </TouchableOpacity>

          <View style={styles.separator} />

          {/* Cacao */}
          <TouchableOpacity style={styles.diagnosticItem}>

            <View style={styles.cropIconContainer}>
              <MaterialCommunityIcons
                name="tree-outline"
                size={28}
                color="#6D4C41"
              />
            </View>

            <View style={styles.diagnosticInfo}>

              <Text style={styles.cropName}>
                Cacao
              </Text>

              <Text style={styles.diagnosticText}>
                Problème foliaire
              </Text>

            </View>

            <MaterialIcons
              name="chevron-right"
              size={28}
              color="#78909C"
            />

          </TouchableOpacity>

          <View style={styles.separator} />

          {/* Manioc */}
          <TouchableOpacity style={styles.diagnosticItem}>

            <View style={styles.cropIconContainer}>
              <MaterialCommunityIcons
                name="leaf"
                size={28}
                color="#43A047"
              />
            </View>

            <View style={styles.diagnosticInfo}>

              <Text style={styles.cropName}>
                Manioc
              </Text>

              <Text style={styles.diagnosticText}>
                Diagnostic à vérifier
              </Text>

            </View>

            <MaterialIcons
              name="chevron-right"
              size={28}
              color="#78909C"
            />

          </TouchableOpacity>

        </View>

      </ScrollView>

      {/* ==================== NAVIGATION BASSE ==================== */}
      <View style={styles.bottomNavigation}>

        {/* Accueil */}
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

        {/* Demandes */}
        <TouchableOpacity style={styles.navItem}>

          <MaterialCommunityIcons
            name="clipboard-text-outline"
            size={24}
            color="#78909C"
          />

          <Text style={styles.navText}>
            Demandes
          </Text>

        </TouchableOpacity>

        {/* Messages */}
        <TouchableOpacity style={styles.navItem}>

          <MaterialCommunityIcons
            name="message-text-outline"
            size={24}
            color="#78909C"
          />

          <Text style={styles.navText}>
            Messages
          </Text>

        </TouchableOpacity>

        {/* Profil */}
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
                name="sprout"
                size={42}
                color="#FFFFFF"
              />

              <Text style={styles.menuTitle}>
                AgriChat
              </Text>

              <Text style={styles.menuSubtitle}>
                Espace Expert agricole
              </Text>

            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
            >

              {/* Mon profil */}
              <TouchableOpacity style={styles.menuItem}>

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
              <TouchableOpacity style={styles.menuItem}>

                <MaterialCommunityIcons
                  name="home-outline"
                  size={24}
                  color="#2E7D32"
                />

                <Text style={styles.menuItemText}>
                  Accueil
                </Text>

              </TouchableOpacity>

              {/* Demandes */}
              <TouchableOpacity style={styles.menuItem}>

                <MaterialCommunityIcons
                  name="clipboard-text-outline"
                  size={24}
                  color="#2E7D32"
                />

                <Text style={styles.menuItemText}>
                  Demandes d'expertise
                </Text>

              </TouchableOpacity>

              {/* Agriculteurs */}
              <TouchableOpacity style={styles.menuItem}>

                <MaterialCommunityIcons
                  name="account-group-outline"
                  size={24}
                  color="#2E7D32"
                />

                <Text style={styles.menuItemText}>
                  Mes agriculteurs
                </Text>

              </TouchableOpacity>

              {/* Diagnostics */}
              <TouchableOpacity style={styles.menuItem}>

                <MaterialCommunityIcons
                  name="stethoscope"
                  size={24}
                  color="#2E7D32"
                />

                <Text style={styles.menuItemText}>
                  Diagnostics
                </Text>

              </TouchableOpacity>

              {/* Messages */}
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

              {/* Notifications */}
              <TouchableOpacity style={styles.menuItem}>

                <MaterialCommunityIcons
                  name="bell-outline"
                  size={24}
                  color="#2E7D32"
                />

                <Text style={styles.menuItemText}>
                  Notifications
                </Text>

              </TouchableOpacity>

              {/* Base de connaissances */}
              <TouchableOpacity style={styles.menuItem}>

                <MaterialCommunityIcons
                  name="book-open-outline"
                  size={24}
                  color="#2E7D32"
                />

                <Text style={styles.menuItemText}>
                  Base de connaissances
                </Text>

              </TouchableOpacity>

              {/* Paramètres */}
              <TouchableOpacity style={styles.menuItem}>

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

              {/* Déconnexion */}
              <TouchableOpacity style={styles.logoutItem}>

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

  /* ================= DEMANDES ================= */

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

  badge: {
    backgroundColor: '#E53935',
    minWidth: 25,
    height: 25,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  badgeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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

  /* ================= DIAGNOSTICS ================= */

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

  diagnosticCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    elevation: 2,
  },

  diagnosticItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },

  cropIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#F1F8E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  diagnosticInfo: {
    flex: 1,
  },

  cropName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
  },

  diagnosticText: {
    color: '#78909C',
    fontSize: 13,
    marginTop: 3,
  },

  separator: {
    height: 1,
    backgroundColor: '#ECEFF1',
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

export default ExpertHomeScreen;