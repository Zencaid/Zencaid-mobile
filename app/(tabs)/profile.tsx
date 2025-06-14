import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Switch,
} from 'react-native';
import { User, Settings, Bell, Shield, CreditCard, CircleHelp as HelpCircle, LogOut, ChevronRight, CreditCard as Edit, MapPin, Phone, Mail, Calendar, Heart, FileText, Users, Globe, Moon, Camera } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    bloodType: 'O+',
    address: '123 Health St, Medical City, MC 12345',
    emergencyContact: 'Jane Doe - (555) 987-6543',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  };

  const profileSections = [
    {
      title: 'Personal Information',
      items: [
        { icon: User, label: 'Edit Profile', onPress: () => {} },
        { icon: MapPin, label: 'Address', value: userProfile.address, onPress: () => {} },
        { icon: Phone, label: 'Phone Number', value: userProfile.phone, onPress: () => {} },
        { icon: Mail, label: 'Email', value: userProfile.email, onPress: () => {} },
      ],
    },
    {
      title: 'Health Information',
      items: [
        { icon: Heart, label: 'Blood Type', value: userProfile.bloodType, onPress: () => {} },
        { icon: Calendar, label: 'Date of Birth', value: new Date(userProfile.dateOfBirth).toLocaleDateString(), onPress: () => {} },
        { icon: Users, label: 'Emergency Contact', value: userProfile.emergencyContact, onPress: () => {} },
        { icon: FileText, label: 'Medical History', onPress: () => {} },
      ],
    },
    {
      title: 'App Settings',
      items: [
        { 
          icon: Bell, 
          label: 'Notifications', 
          hasSwitch: true, 
          switchValue: notificationsEnabled,
          onSwitchChange: setNotificationsEnabled 
        },
        { 
          icon: Moon, 
          label: 'Dark Mode', 
          hasSwitch: true, 
          switchValue: darkModeEnabled,
          onSwitchChange: setDarkModeEnabled 
        },
        { icon: Globe, label: 'Language', value: 'English', onPress: () => {} },
        { icon: Shield, label: 'Privacy & Security', onPress: () => {} },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: CreditCard, label: 'Payment Methods', onPress: () => {} },
        { icon: HelpCircle, label: 'Help & Support', onPress: () => {} },
        { icon: Settings, label: 'App Settings', onPress: () => {} },
      ],
    },
  ];

  const handleLogout = () => {
    // Handle logout logic
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={16} color={Colors.text.inverse} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.userEmail}>{userProfile.email}</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Edit size={16} color={Colors.primary[500]} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Health Stats */}
        <View style={styles.healthStats}>
          <View style={styles.statCard}>
            <Heart size={24} color={Colors.error[500]} />
            <Text style={styles.statValue}>72</Text>
            <Text style={styles.statLabel}>Heart Rate</Text>
          </View>
          <View style={styles.statCard}>
            <FileText size={24} color={Colors.primary[500]} />
            <Text style={styles.statValue}>15</Text>
            <Text style={styles.statLabel}>Records</Text>
          </View>
          <View style={styles.statCard}>
            <Calendar size={24} color={Colors.secondary[500]} />
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Appointments</Text>
          </View>
        </View>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.sectionItem,
                    itemIndex === section.items.length - 1 && styles.sectionItemLast,
                  ]}
                  onPress={item.onPress}
                  disabled={item.hasSwitch}
                >
                  <View style={styles.sectionItemLeft}>
                    <View style={styles.sectionItemIcon}>
                      <item.icon size={20} color={Colors.text.secondary} />
                    </View>
                    <View style={styles.sectionItemContent}>
                      <Text style={styles.sectionItemLabel}>{item.label}</Text>
                      {item.value && (
                        <Text style={styles.sectionItemValue}>{item.value}</Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.sectionItemRight}>
                    {item.hasSwitch ? (
                      <Switch
                        value={item.switchValue}
                        onValueChange={item.onSwitchChange}
                        trackColor={{ 
                          false: Colors.neutral[300], 
                          true: Colors.primary[200] 
                        }}
                        thumbColor={item.switchValue ? Colors.primary[500] : Colors.neutral[100]}
                      />
                    ) : (
                      <ChevronRight size={20} color={Colors.text.tertiary} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color={Colors.error[500]} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.appVersion}>
          <Text style={styles.versionText}>Zencaid v1.0.0</Text>
          <Text style={styles.versionSubtext}>Made with ❤️ for African Healthcare</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.background.secondary,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: Colors.primary[100],
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.background.secondary,
  },
  userName: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
    marginBottom: Spacing.md,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    borderRadius: 20,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  editProfileText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.primary[500],
    marginLeft: Spacing.xs,
  },
  healthStats: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: Spacing.md,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
  },
  statValue: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionContent: {
    backgroundColor: Colors.background.secondary,
    marginHorizontal: Spacing.lg,
    borderRadius: 16,
    overflow: 'hidden',
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  sectionItemLast: {
    borderBottomWidth: 0,
  },
  sectionItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  sectionItemContent: {
    flex: 1,
  },
  sectionItemLabel: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  sectionItemValue: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
  },
  sectionItemRight: {
    marginLeft: Spacing.sm,
  },
  logoutSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.error[50],
    borderRadius: 16,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.error[200],
  },
  logoutText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.primarySemiBold,
    color: Colors.error[500],
    marginLeft: Spacing.sm,
  },
  appVersion: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  versionText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.tertiary,
    marginBottom: Spacing.xs,
  },
  versionSubtext: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.tertiary,
  },
});