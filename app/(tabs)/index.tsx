import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { 
  Bell, 
  Search, 
  Video, 
  Calendar, 
  FileText, 
  Heart,
  Activity,
  Thermometer,
  Users,
  Clock,
  Star
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

export default function HomeScreen() {
  const healthMetrics = [
    { icon: Heart, label: 'Heart Rate', value: '72 bpm', color: Colors.error[500] },
    { icon: Activity, label: 'Blood Pressure', value: '120/80', color: Colors.primary[500] },
    { icon: Thermometer, label: 'Temperature', value: '98.6°F', color: Colors.warning[500] },
  ];

  const quickActions = [
    { icon: Video, label: 'Quick Consult', color: Colors.primary[500] },
    { icon: Calendar, label: 'Book Appointment', color: Colors.secondary[500] },
    { icon: FileText, label: 'View Records', color: Colors.accent[500] },
    { icon: Users, label: 'Family Care', color: Colors.error[500] },
  ];

  const upcomingAppointments = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: 'Today, 2:30 PM',
      avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 4.9,
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'General Physician',
      date: 'Tomorrow, 10:00 AM',
      avatar: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 4.8,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.userName}>John Doe</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Search size={20} color={Colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Bell size={20} color={Colors.text.primary} />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Health Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Health</Text>
          <View style={styles.metricsContainer}>
            {healthMetrics.map((metric, index) => (
              <View key={index} style={styles.metricCard}>
                <View style={[styles.metricIcon, { backgroundColor: `${metric.color}20` }]}>
                  <metric.icon size={24} color={metric.color} />
                </View>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricLabel}>{metric.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.actionCard}>
                <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
                  <action.icon size={24} color={action.color} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingAppointments.map((appointment) => (
            <TouchableOpacity key={appointment.id} style={styles.appointmentCard}>
              <Image 
                source={{ uri: appointment.avatar }} 
                style={styles.doctorAvatar}
              />
              <View style={styles.appointmentInfo}>
                <Text style={styles.doctorName}>{appointment.doctorName}</Text>
                <Text style={styles.doctorSpecialty}>{appointment.specialty}</Text>
                <View style={styles.appointmentMeta}>
                  <Clock size={14} color={Colors.text.tertiary} />
                  <Text style={styles.appointmentTime}>{appointment.date}</Text>
                </View>
              </View>
              <View style={styles.appointmentActions}>
                <View style={styles.ratingContainer}>
                  <Star size={12} color={Colors.warning[500]} fill={Colors.warning[500]} />
                  <Text style={styles.ratingText}>{appointment.rating}</Text>
                </View>
                <TouchableOpacity style={styles.joinButton}>
                  <Video size={16} color={Colors.text.inverse} />
                  <Text style={styles.joinButtonText}>Join</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Health Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Tips</Text>
          <View style={styles.tipCard}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' }}
              style={styles.tipImage}
            />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Stay Hydrated This Summer</Text>
              <Text style={styles.tipDescription}>
                Drink at least 8 glasses of water daily to maintain optimal health and energy levels.
              </Text>
            </View>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxl,
  },
  greeting: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
  },
  userName: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error[500],
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  seeAllText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.primary[500],
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCard: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: Spacing.md,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  metricValue: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  metricLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: Spacing.md,
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  actionLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  appointmentCard: {
    flexDirection: 'row',
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    alignItems: 'center',
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Spacing.md,
  },
  appointmentInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  doctorSpecialty: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  appointmentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentTime: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.tertiary,
    marginLeft: Spacing.xs,
  },
  appointmentActions: {
    alignItems: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  ratingText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
  },
  joinButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary[500],
    borderRadius: 8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.text.inverse,
    marginLeft: Spacing.xs,
  },
  tipCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    overflow: 'hidden',
  },
  tipImage: {
    width: '100%',
    height: 120,
  },
  tipContent: {
    padding: Spacing.md,
  },
  tipTitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  tipDescription: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.md,
  },
});