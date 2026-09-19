import React from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FarmerHomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        background-Color="#FFFFFF"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* En-tête */}
        <View style={styles.header}>
          <View>
            <Text style={styles.hello}>Bonjour 👋</Text>
            <Text style={styles.title}>Espace Agriculteur</Text>
          </View>

          <TouchableOpacity style={styles.notificationButton}>
            <Icon
              name="bell-outline"
              size={25}
              color="#2E7D32"
            />
          </TouchableOpacity>
        </View>

        {/* Carte principale */}
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Icon
              name="sprout"
              size={38}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.heroTitle}>
            Votre assistant agricole
          </Text>

          <Text style={styles.heroText}>
            Analysez vos cultures, suivez leur évolution
            et obtenez des recommandations agricoles.
          </Text>

          <TouchableOpacity style={styles.heroButton}>
            <Text style={styles.heroButtonText}>
              Commencer un diagnostic
            </Text>

            <Icon
              name="arrow-right"
              size={20}
              color="#2E7D32"
            />
          </TouchableOpacity>
        </View>

        {/* Actions rapides */}
        <Text style={styles.sectionTitle}>
          Actions rapides
        </Text>

        <View style={styles.grid}>
          <ActionCard
            icon="magnify"
            title="Diagnostiquer"
            subtitle="Analyser une culture"
          />

          <ActionCard
            icon="leaf"
            title="Mes cultures"
            subtitle="Gérer mes cultures"
          />

          <ActionCard
            icon="chart-line"
            title="Suivi"
            subtitle="Voir l'évolution"
          />

          <ActionCard
            icon="account-voice"
            title="Expert"
            subtitle="Contacter un expert"
          />
        </View>

        {/* Activité récente */}
        <Text style={styles.sectionTitle}>
          Activité récente
        </Text>

        <View style={styles.emptyCard}>
          <Icon
            name="clipboard-text-outline"
            size={42}
            color="#81C784"
          />

          <Text style={styles.emptyTitle}>
            Aucun diagnostic récent
          </Text>

          <Text style={styles.emptyText}>
            Vos diagnostics et suivis apparaîtront ici.
          </Text>
        </View>
      </ScrollView>

      {/* Navigation */}
      <View style={styles.bottomNav}>
        <NavItem
          icon="home"
          label="Accueil"
          active
        />

        <NavItem
          icon="leaf-outline"
          label="Cultures"
        />

        <NavItem
          icon="message-outline"
          label="Messages"
        />

        <NavItem
          icon="account-outline"
          label="Profil"
        />
      </View>
    </SafeAreaView>
  );
};

type ActionCardProps = {
  icon: string;
  title: string;
  subtitle: string;
};

const ActionCard = ({
  icon,
  title,
  subtitle,
}: ActionCardProps) => {
  return (
    <TouchableOpacity style={styles.actionCard}>
      <View style={styles.actionIcon}>
        <Icon
          name={icon}
          size={27}
          color="#2E7D32"
        />
      </View>

      <Text style={styles.actionTitle}>
        {title}
      </Text>

      <Text style={styles.actionSubtitle}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
};

type NavItemProps = {
  icon: string;
  label: string;
  active?: boolean;
};

const NavItem = ({
  icon,
  label,
  active = false,
}: NavItemProps) => {
  return (
    <TouchableOpacity style={styles.navItem}>
      <Icon
        name={icon}
        size={24}
        color={active ? '#2E7D32' : '#777777'}
      />

      <Text
        style={[
          styles.navLabel,
          active && styles.navLabelActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAF7',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  hello: {
    fontSize: 15,
    color: '#777777',
    marginBottom: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B5E20',
  },

  notificationButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroCard: {
    backgroundColor: '#2E7D32',
    borderRadius: 22,
    padding: 22,
    marginBottom: 28,
  },

  heroIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#388E3C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },

  heroText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#E8F5E9',
    marginBottom: 20,
  },

  heroButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  heroButtonText: {
    color: '#2E7D32',
    fontWeight: '700',
    fontSize: 14,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 14,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },

  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 5,
  },

  actionSubtitle: {
    fontSize: 12,
    color: '#777777',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 25,
    alignItems: 'center',
    elevation: 1,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginTop: 12,
    marginBottom: 5,
  },

  emptyText: {
    fontSize: 13,
    color: '#888888',
    textAlign: 'center',
  },

  bottomNav: {
    height: 72,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 65,
  },

  navLabel: {
    fontSize: 11,
    color: '#777777',
    marginTop: 4,
  },

  navLabelActive: {
    color: '#2E7D32',
    fontWeight: '700',
  },
});

export default FarmerHomeScreen;