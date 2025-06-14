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
import { FileText, Heart, Activity, Thermometer, Plus, Download, Eye, Calendar, User, Stethoscope, Pill, CircleAlert as AlertCircle, TrendingUp } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

export default function RecordsScreen() {
  const [selectedTab, setSelectedTab] = useState<'records' | 'vitals' | 'medications'>('records');

  const medicalRecords = [
    {
      id: '1',
      date: '2024-01-15',
      doctorName: 'Dr. Sarah Johnson',
      doctorSpecialty: 'Cardiologist',
      diagnosis: 'Hypertension Management',
      symptoms: ['Chest pain', 'Shortness of breath'],
      treatment: 'Prescribed blood pressure medication',
      attachments: 2,
      avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    },
    {
      id: '2',
      date: '2024-01-10',
      doctorName: 'Dr. Michael Chen',
      doctorSpecialty: 'General Physician',
      diagnosis: 'Annual Physical Examination',
      symptoms: ['Routine checkup'],
      treatment: 'All vitals normal, recommended annual follow-up',
      attachments: 1,
      avatar: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    },
    {
      id: '3',
      date: '2024-01-05',
      doctorName: 'Dr. Emily Rodriguez',
      doctorSpecialty: 'Dermatologist',
      diagnosis: 'Skin Condition Assessment',
      symptoms: ['Skin rash', 'Itching'],
      treatment: 'Topical cream prescribed',
      attachments: 3,
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    },
  ];

  const vitalSigns = [
    {
      type: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      date: '2024-01-15',
      status: 'normal',
      trend: 'stable',
      icon: Heart,
      color: Colors.error[500],
    },
    {
      type: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      date: '2024-01-15',
      status: 'normal',
      trend: 'down',
      icon: Activity,
      color: Colors.primary[500],
    },
    {
      type: 'Temperature',
      value: '98.6',
      unit: '°F',
      date: '2024-01-15',
      status: 'normal',
      trend: 'stable',
      icon: Thermometer,
      color: Colors.warning[500],
    },
  ];

  const medications = [
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      prescribedBy: 'Dr. Sarah Johnson',
      status: 'active',
      instructions: 'Take with food in the morning',
    },
    {
      id: '2',
      name: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      startDate: '2024-01-10',
      endDate: null,
      prescribedBy: 'Dr. Michael Chen',
      status: 'active',
      instructions: 'Take with meal',
    },
    {
      id: '3',
      name: 'Hydrocortisone Cream',
      dosage: '1%',
      frequency: 'Twice daily',
      startDate: '2024-01-05',
      endDate: '2024-01-19',
      prescribedBy: 'Dr. Emily Rodriguez',
      status: 'completed',
      instructions: 'Apply to affected area only',
    },
  ];

  const renderRecordsTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {medicalRecords.map((record) => (
        <View key={record.id} style={styles.recordCard}>
          <View style={styles.recordHeader}>
            <View style={styles.recordBasicInfo}>
              <Image source={{ uri: record.avatar }} style={styles.doctorAvatar} />
              <View style={styles.recordInfo}>
                <Text style={styles.diagnosisText}>{record.diagnosis}</Text>
                <Text style={styles.doctorText}>{record.doctorName}</Text>
                <Text style={styles.specialtyText}>{record.doctorSpecialty}</Text>
              </View>
            </View>
            <View style={styles.recordMeta}>
              <Text style={styles.dateText}>{new Date(record.date).toLocaleDateString()}</Text>
              <View style={styles.attachmentCount}>
                <FileText size={14} color={Colors.text.tertiary} />
                <Text style={styles.attachmentText}>{record.attachments}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.recordDetails}>
            <View style={styles.symptomsContainer}>
              <Text style={styles.detailLabel}>Symptoms:</Text>
              <Text style={styles.detailText}>{record.symptoms.join(', ')}</Text>
            </View>
            <View style={styles.treatmentContainer}>
              <Text style={styles.detailLabel}>Treatment:</Text>
              <Text style={styles.detailText}>{record.treatment}</Text>
            </View>
          </View>

          <View style={styles.recordActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Eye size={16} color={Colors.primary[500]} />
              <Text style={styles.actionButtonText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Download size={16} color={Colors.secondary[500]} />
              <Text style={styles.actionButtonText}>Download</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderVitalsTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {vitalSigns.map((vital, index) => (
        <View key={index} style={styles.vitalCard}>
          <View style={styles.vitalHeader}>
            <View style={[styles.vitalIcon, { backgroundColor: `${vital.color}20` }]}>
              <vital.icon size={24} color={vital.color} />
            </View>
            <View style={styles.vitalInfo}>
              <Text style={styles.vitalType}>{vital.type}</Text>
              <Text style={styles.vitalDate}>{new Date(vital.date).toLocaleDateString()}</Text>
            </View>
            <View style={styles.vitalValue}>
              <Text style={styles.vitalNumber}>{vital.value}</Text>
              <Text style={styles.vitalUnit}>{vital.unit}</Text>
            </View>
          </View>
          
          <View style={styles.vitalStatus}>
            <View style={[styles.statusIndicator, { 
              backgroundColor: vital.status === 'normal' ? Colors.success[500] : Colors.warning[500] 
            }]} />
            <Text style={styles.statusText}>{vital.status.toUpperCase()}</Text>
            <View style={styles.trendContainer}>
              <TrendingUp 
                size={14} 
                color={vital.trend === 'up' ? Colors.success[500] : 
                       vital.trend === 'down' ? Colors.error[500] : Colors.neutral[400]} 
              />
              <Text style={styles.trendText}>{vital.trend}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderMedicationsTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {medications.map((medication) => (
        <View key={medication.id} style={styles.medicationCard}>
          <View style={styles.medicationHeader}>
            <View style={styles.medicationIcon}>
              <Pill size={24} color={Colors.primary[500]} />
            </View>
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>{medication.name}</Text>
              <Text style={styles.medicationDosage}>{medication.dosage} - {medication.frequency}</Text>
              <Text style={styles.prescribedBy}>Prescribed by {medication.prescribedBy}</Text>
            </View>
            <View style={[styles.statusBadge, {
              backgroundColor: medication.status === 'active' ? Colors.success[50] : Colors.neutral[100]
            }]}>
              <Text style={[styles.statusBadgeText, {
                color: medication.status === 'active' ? Colors.success[700] : Colors.neutral[600]
              }]}>
                {medication.status.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.medicationDetails}>
            <Text style={styles.medicationInstructions}>{medication.instructions}</Text>
            <View style={styles.medicationDates}>
              <Text style={styles.dateRange}>
                Start: {new Date(medication.startDate).toLocaleDateString()}
                {medication.endDate && ` - End: ${new Date(medication.endDate).toLocaleDateString()}`}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
          <View>
          <Text style={styles.headerTitle}>Health Records</Text>
          <Text style={styles.headerSubtitle}>Get direct access to files</Text>
          </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={Colors.text.inverse} />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'records' && styles.tabButtonActive]}
          onPress={() => setSelectedTab('records')}
        >
          <FileText size={20} color={selectedTab === 'records' ? Colors.primary[500] : Colors.text.secondary} />
          <Text style={[styles.tabButtonText, selectedTab === 'records' && styles.tabButtonTextActive]}>
            Records
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'vitals' && styles.tabButtonActive]}
          onPress={() => setSelectedTab('vitals')}
        >
          <Activity size={20} color={selectedTab === 'vitals' ? Colors.primary[500] : Colors.text.secondary} />
          <Text style={[styles.tabButtonText, selectedTab === 'vitals' && styles.tabButtonTextActive]}>
            Vitals
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'medications' && styles.tabButtonActive]}
          onPress={() => setSelectedTab('medications')}
        >
          <Pill size={20} color={selectedTab === 'medications' ? Colors.primary[500] : Colors.text.secondary} />
          <Text style={[styles.tabButtonText, selectedTab === 'medications' && styles.tabButtonTextActive]}>
            Medications
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.content}>
        {selectedTab === 'records' && renderRecordsTab()}
        {selectedTab === 'vitals' && renderVitalsTab()}
        {selectedTab === 'medications' && renderMedicationsTab()}
      </View>
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
    paddingVertical: Spacing.xxl,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xxl,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
    paddingTop: Spacing.sm,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: Colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabNavigation: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    marginHorizontal: Spacing.xs,
    borderRadius: 12,
    backgroundColor: Colors.background.secondary,
  },
  tabButtonActive: {
    backgroundColor: Colors.primary[100],
  },
  tabButtonText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
  },
  tabButtonTextActive: {
    color: Colors.primary[500],
  },
  content: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  recordCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: Spacing.lg,
    paddingTop: Spacing.xxl,
    marginBottom: Spacing.md,
    shadowColor: Colors.neutral[800],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 9,
    elevation: 2,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  recordBasicInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  doctorAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: Spacing.md,
    backgroundColor: Colors.primary[300],
  },
  recordInfo: {
    flex: 1,
  },
  diagnosisText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  doctorText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.text.secondary,
  },
  specialtyText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.tertiary,
  },
  recordMeta: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  attachmentCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachmentText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.tertiary,
    marginLeft: Spacing.xs,
  },
  recordDetails: {
    marginBottom: Spacing.md,
  },
  symptomsContainer: {
    marginBottom: Spacing.sm,
  },
  treatmentContainer: {
    marginBottom: Spacing.sm,
  },
  detailLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  detailText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.md,
  },
  recordActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    paddingTop: Spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  actionButtonText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primaryMedium,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
  },
  vitalCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  vitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  vitalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  vitalInfo: {
    flex: 1,
  },
  vitalType: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  vitalDate: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
  },
  vitalValue: {
    alignItems: 'flex-end',
  },
  vitalNumber: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
  },
  vitalUnit: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
  },
  vitalStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.sm,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.secondary,
    marginRight: Spacing.md,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.tertiary,
    marginLeft: Spacing.xs,
  },
  medicationCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  medicationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  medicationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.primaryBold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  medicationDosage: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  prescribedBy: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.tertiary,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primaryBold,
  },
  medicationDetails: {
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    paddingTop: Spacing.md,
  },
  medicationInstructions: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
    lineHeight: Typography.lineHeight.md,
  },
  medicationDates: {
    marginTop: Spacing.xs,
  },
  dateRange: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.text.tertiary,
  },
});