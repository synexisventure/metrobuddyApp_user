import React, { useState, useRef, useCallback, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../../context/AppContext';

// Components
import StepFormsHeader from "../../components/becomePartner/StepFormsHeader";
import Step2Form from '../../components/becomePartner/Step2Form';
import Step3Form from '../../components/becomePartner/Step3Form';
import Step4Form from '../../components/becomePartner/Step4Form';
import Step5Form from '../../components/becomePartner/Step5Form';
import Step6Form from '../../components/becomePartner/Step6Form';
import Step7Form from '../../components/becomePartner/Step7Form';

const AddBusinessScreen = () => {
  const {
    fetchFormStatus,
    formStatus,
    formStatusLoading,
  } = useContext(AppContext);

  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const scrollRef = useRef(null);

  const [status, setStatus] = useState({
    1: 'pending',
    2: 'pending',
    3: 'pending',
    4: 'pending',
    5: 'pending',
    6: 'pending',
  });

  const formNames = [
    'Business Details',
    'Contacts Details',
    'Business Timing',
    'Select Category',
    'Photos & Videos',
    'Verify Documents'
  ];

  const scrollToTop = () => scrollRef.current?.scrollTo({ y: 0, animated: true });

  const nextStep = (submitted = true) => {
    setStep(prev => {
      if (prev > 0 && prev <= totalSteps) {
        setStatus(prevStatus => ({
          ...prevStatus,
          [prev]: submitted ? 'completed' : 'skipped'
        }));
      }
      const next = Math.min(prev + 1, totalSteps);
      setTimeout(scrollToTop, 50);
      return next;
    });
  };

  const prevStep = () => {
    setStep(prev => {
      const back = Math.max(prev - 1, 1);
      setTimeout(scrollToTop, 50);
      return back;
    });
  };

  // ✅ Fetch form status from context
  useFocusEffect(
    useCallback(() => {
      fetchFormStatus();
      setTimeout(scrollToTop, 50);
    }, [])
  );

  // ✅ Whenever formStatus updates, update step circles
  React.useEffect(() => {
    if (formStatus) {
      setStatus({
        1: formStatus.business_details ? 'completed' : 'pending',
        2: formStatus.contact_details ? 'completed' : 'pending',
        3: formStatus.business_timing ? 'completed' : 'pending',
        4: formStatus.business_category ? 'completed' : 'pending',
        5: formStatus.photos_videos ? 'completed' : 'pending',
        6: formStatus.document_upload ? 'completed' : 'pending',
      });
    }
  }, [formStatus]);

  const renderStep = () => {
    switch (step) {
      case 1: return <Step2Form onNext={() => nextStep(true)} />;
      case 2: return <Step3Form onNext={() => nextStep(true)} />;
      case 3: return <Step4Form onNext={() => nextStep(true)} />;
      case 4: return <Step5Form onNext={() => nextStep(true)} />;
      case 5: return <Step6Form onNext={() => nextStep(true)} />;
      case 6: return <Step7Form onNext={() => nextStep(true)} />;
      default: return null;
    }
  };

  return (
    <>
      <StepFormsHeader />

      {step > 0 && (
        <View style={styles.headerContainer}>
          <View style={styles.progressContainer}>
            {formNames.map((name, index) => {
              const formStep = index + 1;
              const st = status[formStep];
              const isCompleted = st === 'completed';
              const isSkipped = st === 'skipped';
              const isActive = step === formStep;

              return (
                <View key={formStep} style={styles.stepWrapper}>
                  <View
                    style={[
                      styles.stepCircle,
                      isCompleted ? styles.completed :
                      isSkipped ? styles.skipped :
                      isActive ? styles.active :
                      styles.pending
                    ]}
                  >
                    <Text style={styles.stepTextInside}>
                      {isCompleted ? '✓' : isSkipped ? '–' : formStep}
                    </Text>
                  </View>

                  <Text style={styles.stepLabel}>
                    {name}
                    {index === 0 && <Text style={styles.mandatoryStar}> *</Text>}
                  </Text>

                  {index < formNames.length - 1 && (
                    <View
                      style={[
                        styles.stepLine,
                        isCompleted ? styles.completedLine : styles.pendingLine
                      ]}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </View>
      )}

      <ScrollView
        ref={scrollRef}
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 36 }}
        showsVerticalScrollIndicator={false}
      >
        {step > 1 && (
          <TouchableOpacity activeOpacity={0.85} onPress={prevStep} style={styles.prevBtn}>
            <View style={styles.prevContent}>
              <Image
                source={require('../../assets/images/backArrow.png')}
                style={styles.prevIcon}
              />
              <Text style={styles.prevText}>Previous Form</Text>
            </View>
          </TouchableOpacity>
        )}

        {renderStep()}

        {step > 1 && (
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => nextStep(false)}
          >
            <Text style={styles.skipText}>Skip for Now</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </>
  );
};

export default AddBusinessScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, paddingTop: 10, backgroundColor: "#fff" },
  headerContainer: { backgroundColor: '#fff', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' },
  progressContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 6, marginHorizontal: 6, zIndex: 2 },
  stepWrapper: { flex: 1, alignItems: 'center', paddingHorizontal: 4 },
  stepCircle: { width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', zIndex: 3 },
  stepTextInside: { color: '#fff', fontWeight: '700', fontSize: 12 },
  completed: { backgroundColor: '#27ae60' },
  skipped: { backgroundColor: '#f39c12' },
  active: { backgroundColor: '#155DFC' },
  pending: { backgroundColor: '#d3d3d3' },
  stepLabel: { fontSize: 10, color: '#555', marginTop: 6, textAlign: 'center', width: 70 },
  mandatoryStar: {
    color: '#E53935',
    fontWeight: '700',
    fontSize: 12,
  },
  stepLine: { position: 'absolute', top: 15, right: -45, width: 90, height: 4, borderRadius: 2, zIndex: 1 },
  completedLine: { backgroundColor: '#27ae60' },
  pendingLine: { backgroundColor: '#d3d3d3' },

  prevBtn: {
    backgroundColor: '#F6F8FB',
    borderWidth: 1,
    borderColor: '#E0E4EA',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prevContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prevIcon: {
    width: 20,
    height: 20,
    tintColor: '#155DFC',
    marginRight: 8,
  },
  prevText: {
    color: '#155DFC',
    fontSize: 15,
    fontWeight: '600',
  },

  skipBtn: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 14, marginHorizontal: 10 },
  skipText: { color: '#555', fontSize: 15, fontWeight: '500' },
});
