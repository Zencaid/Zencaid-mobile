import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import { 
  Search, 
  Filter, 
  Video, 
  MessageCircle, 
  Phone,
  Star,
  MapPin,
  Clock,
  Calendar,
  Stethoscope
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

export default function ConsultationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = [
    'All',
    'General',
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Orthopedics',
  ];

  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.9,
      reviewCount: 342,
      experience: '15 years',
      consultationFee: 150,
      isOnline: true,
      nextAvailable: '2:30 PM Today',
      languages: ['English', 'French'],
      avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'General Physician',
      rating: 4.8,
      reviewCount: 256,
      experience: '12 years',
      consultationFee: 100,
      isOnline: true,
      nextAvailable: '4:00 PM Today',
      languages: ['English', 'Mandarin'],
      avatar: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dermatologist',
      rating: 4.7,
      reviewCount: 189,
      experience: '8 years',
      consultationFee: 120,
      isOnline: false,
      nextAvailable: 'Tomorrow 9:00 AM',
      languages: ['English', 'Spanish'],
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialty: 'Pediatrician',
      rating: 4.9,
      reviewCount: 421,
      experience: '20 years',
      consultationFee: 110,
      isOnline: true,
      nextAvailable: '6:00 PM Today',
      languages: ['English'],
      avatar: 'https://images.pexels.com/photos/582750/pexels-photo-582750.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || 
                            doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    return matchesSearch && matchesSpecialty;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find a Doctor</Text>
        <Text style={styles.headerSubtitle}>Connect with verified healthcare professionals</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.neutral[400]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors, specialties..."
            placeholderTextColor={Colors.neutral[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors.primary[500]} />
        </TouchableOpacity>
      </View>

      {/* Specialties */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.specialtiesContainer}
        contentContainerStyle={styles.specialtiesContent}
      >
        {specialties.map((specialty) => (
          <TouchableOpacity
            key={specialty}
            style={[
              styles.specialtyChip,
              selectedSpecialty === specialty && styles.specialtyChipActive,
            ]}
            onPress={() => setSelectedSpecialty(specialty)}
          >
            <Text
              style={[
                styles.specialtyChipText,
                selectedSpecialty === specialty && styles.specialtyChipTextActive,
              ]}
            >
              {specialty}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Doctors List */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredDoctors.map((doctor) => (
          <View key={doctor.id} style={styles.doctorCard}>
            <View style={styles.doctorHeader}>
              <View style={styles.doctorBasicInfo}>
                <Image source={{ uri: doctor.avatar }} style={styles.doctorAvatar} />
                <View style={styles.onlineIndicatorContainer}>
                  {doctor.isOnline && <View style={styles.onlineIndicator} />}
                </View>
              </View>
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                <View style={styles.doctorMeta}>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color={Colors.warning[500]} fill={Colors.warning[500]} />
                    <Text style={styles.ratingText}>{doctor.rating}</Text>
                    <Text style={styles.reviewText}>({doctor.reviewCount})</Text>
                  </View>
                  <View style={styles.experienceContainer}>
                    <Stethoscope size={14} color={Colors.text.tertiary} />
                    <Text style={styles.experienceText}>{doctor.experience}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.doctorDetails}>
              <View style={styles.availabilityContainer}>
                <Clock size={16} color={Colors.secondary[500]} />
                <Text style={styles.availabilityText}>Available: {doctor.nextAvailable}</Text>
              </View>
              <View style={styles.languagesContainer}>
                <Text style={styles.languagesLabel}>Languages: </Text>
                <Text style={styles.languagesText}>{doctor.languages.join(', ')}</Text>
              </View>
            </View>

            <View style={styles.doctorActions}>
              <View style={styles.feeContainer}>
                <Text style={styles.feeLabel}>Consultation Fee</Text>
                <Text style={styles.feeAmount}>${doctor.consultationFee}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.chatButton}>
                  <MessageCircle size={18} color={Colors.text.inverse} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.callButton}>
                  <Phone size={18} color={Colors.text.inverse} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.videoButton}>
                  <Video size={18} color={Colors.text.inverse} />
                  <Text style={styles.videoButtonText}>Video Call</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {filteredDoctors.length === 0 && (
          <View style={styles.emptyState}>
            <Stethoscope size={48} color={Colors.neutral[300]} />
            <Text style={styles.emptyStateTitle}>No doctors found</Text>
            <Text style={styles.emptyStateSubtitle}>
              Try adjusting your search or filters
            </Text>
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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xxl,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
    paddingTop: Spacing.sm,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    alignItems: 'center',
    borderColor: Colors.neutral[300],
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: Spacing.lg,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.sm,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.primary,
  },
  filterButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: Colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
  },
  specialtiesContainer: {
    paddingBottom: Spacing.md,
  },
  specialtiesContent: {
    paddingHorizontal: Spacing.lg,
    height: 40,
  },
  specialtyChip: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 10,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specialtyChipActive: {
    backgroundColor: Colors.primary[500],
  },
  specialtyChipText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.text.secondary,
  },
  specialtyChipTextActive: {
    color: Colors.text.inverse,
  },
  scrollView: {
    marginTop: Spacing.xs, 
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  doctorCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: Colors.neutral[800],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 2,
  },
  doctorHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  doctorBasicInfo: {
    position: 'relative',
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Spacing.md,
  },
  onlineIndicatorContainer: {
    position: 'absolute',
    bottom: 2,
    right: Spacing.md + 2,
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.success[500],
    borderWidth: 2,
    borderColor: Colors.background.secondary,
  },
  doctorInfo: {
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
    color: Colors.primary[500],
    marginBottom: Spacing.sm,
  },
  doctorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  ratingText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.text.primary,
    marginLeft: Spacing.xs,
  },
  reviewText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.tertiary,
    marginLeft: Spacing.xs,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  experienceText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.tertiary,
    marginLeft: Spacing.xs,
  },
  doctorDetails: {
    marginBottom: Spacing.md,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  availabilityText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
  },
  languagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languagesLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.text.secondary,
  },
  languagesText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.tertiary,
  },
  doctorActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    paddingTop: Spacing.md,
  },
  feeContainer: {
    flex: 1,
  },
  feeLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.tertiary,
  },
  feeAmount: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.warning[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  videoButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary[500],
    borderRadius: 20,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  videoButtonText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.text.inverse,
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
  },
});