import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, Linking } from 'react-native';
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';

const DashboardPersonalWallet = ({  }) => {
  const navigation = useNavigation();
    
  const { businessDocuments, IMAGE_BASE_URL } = useContext(AppContext);

  const documents = [
    {
      id: 1,
      name: 'MSME Certificate',
      key: 'msmeCertificate',
      uploaded: !!businessDocuments?.msmeCertificate,
      fileUrl: businessDocuments?.msmeCertificate ? `${IMAGE_BASE_URL}/uploads/businessDocuments/${businessDocuments.msmeCertificate}` : null,
    },
    {
      id: 2,
      name: 'CIN Certificate',
      key: 'cinCertificate',
      uploaded: !!businessDocuments?.cinCertificate,
      fileUrl: businessDocuments?.cinCertificate ? `${IMAGE_BASE_URL}/uploads/businessDocuments/${businessDocuments.cinCertificate}` : null,
    },
    {
      id: 3,
      name: 'GSTIN Certificate',
      key: 'gstinCertificate',
      uploaded: !!businessDocuments?.gstinCertificate,
      fileUrl: businessDocuments?.gstinCertificate ? `${IMAGE_BASE_URL}/uploads/businessDocuments/${businessDocuments.gstinCertificate}` : null,
    },
    {
      id: 4,
      name: 'FSSAI Certificate',
      key: 'fssaiCertificate',
      uploaded: !!businessDocuments?.fssaiCertificate,
      fileUrl: businessDocuments?.fssaiCertificate ? `${IMAGE_BASE_URL}/uploads/businessDocuments/${businessDocuments.fssaiCertificate}` : null,
    },
  ];

  const handleViewDocument = async (fileUrl) => {
    if (!fileUrl) return;

    try {
      // Check if file is PDF or image
      const isPdf = fileUrl.toLowerCase().endsWith('.pdf');
      
      if (isPdf) {
        // For PDF files, open in browser or PDF viewer
        const supported = await Linking.canOpenURL(fileUrl);
        
        if (supported) {
          await Linking.openURL(fileUrl);
        } else {
          Alert.alert('Error', 'No app available to open PDF files');
        }
      } else {
        // For images, open directly
        await Linking.openURL(fileUrl);
      }
    } catch (error) {
      console.log('Error opening document:', error);
      Alert.alert('Error', 'Could not open document');
    }
  };

  const handleEditDocuments = () => {
    navigation.navigate('UploadDocumentScreen');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Business Documents</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditDocuments}>
          <Image 
            source={require('../../assets/images/edit.png')} 
            style={styles.editIcon} 
          />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Documents List */}
      <View style={styles.documentsContainer}>
        {documents.map((doc) => (
          <View key={doc.id} style={styles.documentCard}>
            <View style={styles.documentInfo}>
              <Text style={styles.documentName}>{doc.name}</Text>
              <View style={styles.statusContainer}>
                <View 
                  style={[
                    styles.statusDot,
                    doc.uploaded ? styles.uploadedDot : styles.notUploadedDot
                  ]} 
                />
                <Text style={[
                  styles.statusText,
                  doc.uploaded ? styles.uploadedText : styles.notUploadedText
                ]}>
                  {doc.uploaded ? 'Uploaded' : 'Not Uploaded'}
                </Text>
              </View>
            </View>
            
            {doc.uploaded ? (
              <TouchableOpacity 
                style={styles.viewButton}
                onPress={() => handleViewDocument(doc.fileUrl)}
              >
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            ) : (
              // <View style={styles.uploadButton}>
              //   <Text style={styles.uploadButtonText}>Upload</Text>
              // </View>
              null
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

export default DashboardPersonalWallet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e8ecff',
  },
  editIcon: {
    width: 14,
    height: 14,
    tintColor: '#155DFC',
    marginRight: 6,
  },
  editText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#155DFC',
  },
  documentsContainer: {
    marginBottom: 20,
  },
  documentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  uploadedDot: {
    backgroundColor: '#34C759',
  },
  notUploadedDot: {
    backgroundColor: '#FF3B30',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  uploadedText: {
    color: '#34C759',
  },
  notUploadedText: {
    color: '#FF3B30',
  },
  viewButton: {
    backgroundColor: '#155DFC',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  uploadButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
});