import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { Calendar, Clock, Video, Phone, MessageCircle, Plus, Filter, MapPin, Star, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

export default function AppointmentsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  const appointments = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      doctorSpecialty: 'Cardiologist',
      date: '2024-01-20',
      time: '2:30 PM',
      type: 'video',
      status: 'scheduled',
      reason: 'Follow-up consultation for hypertension',
      location: 'Video Call',
      fee: 150,
      rating: 4.9,
      avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      doctorSpecialty: 'General Physician',
      date: '2024-01-22',
      time: '10:00 AM',
      type: 'in_person',
      status: 'scheduled',
      reason: 'Annual physical examination',
      location: 'City Medical Center, Room 205',
      fee: 100,
      rating: 4.8,
      avatar: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      id: '3',
      doctorName: 'Dr. Emily Rodriguez',
      doctorSpecialty: 'Dermatologist',
      date: '2024-01-15',
      time: '3:00 PM',
      type: 'video',
      status: 'completed',
      reason: 'Skin condition consultation',
      location: 'Video Call',
      fee: 120,
      rating: 4.7,
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      id: '4',
      doctorName: 'Dr. James Wilson',
      doctorSpecialty: 'Pediatrician',
      date: '2024-01-12',
      time: '11:30 AM',
      type: 'in_person',
      status: 'cancelled',
      reason: 'Child vaccination',
      location: 'Children\'s Hospital, Wing B',
      fee: 110,
      rating: 4.9,
      avatar: 'https://images.pexels.com/photos/582750/pexels-photo-582750.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
  ];

  const filterButtons = [
    { key: 'all', label: 'All', count: appointments.length },
    { key: 'upcoming', label: 'Upcoming', count: appointments.filter(a => a.status === 'scheduled').length },
    { key: 'completed', label: 'Completed', count: appointments.filter(a => a.status === 'completed').length },
    { key: 'cancelled', label: 'Cancelled', count: appointments.filter(a => a.status === 'cancelled').length },
  ];

  const filteredAppointments = appointments.filter(appointment => {
    if (selectedFilter === 'all') return true;
    return appointment.status === selectedFilter || 
           (selectedFilter === 'upcoming' && appointment.status === 'scheduled');
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock size={16} color={Colors.primary[500]} />;
      case 'completed':
        return <CheckCircle size={16} color={Colors.success[500]} />;
      case 'cancelled':
        return <XCircle size={16} color={Colors.error[500]} />;
      default:
        return <AlertCircle size={16} color={Colors.warning[500]} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return Colors.primary[500];
      case 'completed':
        return Colors.success[500];
      case 'cancelled':
        return Colors.error[500];
      default:
        return Colors.warning[500];
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video size={16} color={Colors.primary[500]} />;
      case 'audio':
        return <Phone size={16} color={Colors.secondary[500]} />;
      case 'chat':
        return <MessageCircle size={16} color={Colors.accent[500]} />;
      case 'in_person':
        return <MapPin size={16} color={Colors.neutral[500]} />;
      default:
        return <Calendar size={16} color={Colors.neutral[500]} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={Colors.text.inverse} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filterButtons.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              selectedFilter === filter.key && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter.key as any)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilter === filter.key && styles.filterButtonTextActive,
              ]}
            >
              {filter.label}
            </Text>
            <View style={[
              styles.filterCount,
              selectedFilter === filter.key && styles.filterCountActive,
            ]}>
              <Text style={[
                styles.filterCountText,
                selectedFilter === filter.key && styles.filterCountTextActive,
              ]}>
                {filter.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Appointments List */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredAppointments.map((appointment) => (
          <View key={appointment.id} style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <View style={styles.appointmentBasicInfo}>
                <Image source={{ uri: appointment.avatar }} style={styles.doctorAvatar} />
                <View style={styles.appointmentInfo}>
                  <Text style={styles.doctorName}>{appointment.doctorName}</Text>
                  <Text style={styles.doctorSpecialty}>{appointment.doctorSpecialty}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={12} color={Colors.warning[500]} fill={Colors.warning[500]} />
                    <Text style={styles.ratingText}>{appointment.rating}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.appointmentMeta}>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(appointment.status)}20` }]}>
                  {getStatusIcon(appointment.status)}
                  <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.appointmentDetails}>
              <View style={styles.dateTimeContainer}>
                <Calendar size={16} color={Colors.text.secondary} />
                <Text style={styles.dateTimeText}>
                  {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                </Text>
              </View>
              
              <View style={styles.typeLocationContainer}>
                {getTypeIcon(appointment.type)}
                <Text style={styles.locationText}>{appointment.location}</Text>
              </View>

              <View style={styles.reasonContainer}>
                <Text style={styles.reasonLabel}>Reason:</Text>
                <Text style={styles.reasonText}>{appointment.reason}</Text>
              </View>
            </View>

            <View style={styles.appointmentFooter}>
              <View style={styles.feeContainer}>
                <Text style={styles.feeLabel}>Fee:</Text>
                <Text style={styles.feeAmount}>${appointment.fee}</Text>
              </View>
              
              <View style={styles.appointmentActions}>
                {appointment.status === 'scheduled' && (
                  <>
                    {appointment.type === 'video' && (
                      <TouchableOpacity style={styles.joinButton}>
                        <Video size={16} color={Colors.text.inverse} />
                        <Text style={styles.joinButtonText}>Join</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.rescheduleButton}>
                      <Text style={styles.rescheduleButtonText}>Reschedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </>
                )}
                
                {appointment.status === 'completed' && (
                  <TouchableOpacity style={styles.reviewButton}>
                    <Star size={16} color={Colors.warning[500]} />
                    <Text style={styles.reviewButtonText}>Review</Text>
                  </TouchableOpacity>
                )}
                
                {appointment.status === 'cancelled' && (
                  <TouchableOpacity style={styles.rebookButton}>
                    <Calendar size={16} color={Colors.primary[500]} />
                    <Text style={styles.rebookButtonText}>Rebook</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))}

        {filteredAppointments.length === 0 && (
          <View style={styles.emptyState}>
            <Calendar size={48} color={Colors.neutral[300]} />
            <Text style={styles.emptyStateTitle}>No appointments found</Text>
            <Text style={styles.emptyStateSubtitle}>
              {selectedFilter === 'all' 
                ? 'Book your first appointment with a doctor'
                : `No ${selectedFilter} appointments at the moment`}
            </Text>
            <TouchableOpacity style={styles.bookButton}>
              <Plus size={20} color={Colors.text.inverse} />
              <Text style={styles.bookButtonText}>Book Appointment</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xxl,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
  },
  filterContent: {
    paddingHorizontal: Spacing.lg,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.sm,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary[500],
  },
  filterButtonText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.text.secondary,
    marginRight: Spacing.xs,
  },
  filterButtonTextActive: {
    color: Colors.text.inverse,
  },
  filterCount: {
    backgroundColor: Colors.neutral[200],
    borderRadius: 10,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  filterCountActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterCountText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.secondary,
  },
  filterCountTextActive: {
    color: Colors.text.inverse,
  },
  scrollView: {
    marginTop: Spacing.xs, 
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  appointmentCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    paddingVertical: Spacing.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: Colors.neutral[800],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  appointmentBasicInfo: {
    flexDirection: 'row',
    flex: 1,
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
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  doctorSpecialty: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.primary[500],
    marginBottom: Spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
  },
  appointmentMeta: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primaryBold,
    marginLeft: Spacing.xs,
  },
  appointmentDetails: {
    marginBottom: Spacing.md,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  dateTimeText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.text.primary,
    marginLeft: Spacing.xs,
  },
  typeLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  locationText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
    flex: 1,
  },
  reasonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  reasonLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
    marginRight: Spacing.xs,
  },
  reasonText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
    flex: 1,
    lineHeight: Typography.lineHeight.md,
  },
  appointmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    paddingTop: Spacing.md,
  },
  feeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feeLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
    marginRight: Spacing.xs,
  },
  feeAmount: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.primary[500],
  },
  appointmentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary[500],
    borderRadius: 8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    alignItems: 'center',
    marginRight: Spacing.xs,
  },
  joinButtonText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.text.inverse,
    marginLeft: Spacing.xs,
  },
  rescheduleButton: {
    backgroundColor: Colors.secondary[50],
    borderRadius: 8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    marginRight: Spacing.xs,
  },
  rescheduleButtonText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.secondary[600],
  },
  cancelButton: {
    backgroundColor: Colors.error[50],
    borderRadius: 8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  cancelButtonText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.error[600],
  },
  reviewButton: {
    flexDirection: 'row',
    backgroundColor: Colors.warning[50],
    borderRadius: 8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    alignItems: 'center',
  },
  reviewButtonText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.warning[700],
    marginLeft: Spacing.xs,
  },
  rebookButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary[50],
    borderRadius: 8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    alignItems: 'center',
  },
  rebookButtonText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.primary[600],
    marginLeft: Spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
  },
  emptyStateTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  emptyStateSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: Typography.lineHeight.md,
  },
  bookButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary[500],
    borderRadius: 12,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.primarySemiBold,
    color: Colors.text.inverse,
    marginLeft: Spacing.xs,
  },
});