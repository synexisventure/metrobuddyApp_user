import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import StepFormsHeader from "../../components/becomePartner/StepFormsHeader";

import Step1Form from '../../components/becomePartner/Step1Form';
import Step2Form from '../../components/becomePartner/Step2Form';
import Step3Form from '../../components/becomePartner/Step3Form';
import Step4Form from '../../components/becomePartner/Step4Form';
import Step5Form from '../../components/becomePartner/Step5Form';
import Step6Form from '../../components/becomePartner/Step6Form';
import Step7Form from '../../components/becomePartner/Step7Form';

const BecomePartnerScreen = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const scrollRef = useRef(null); // 👈 ref to ScrollView

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const nextStep = () => {
    setStep(prev => {
      const next = Math.min(prev + 1, totalSteps);
      setTimeout(scrollToTop, 50); // 👈 scroll after state update
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

  const progress = (step / totalSteps) * 100;

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Form onNext={nextStep} />;
      case 2: return <Step2Form onNext={nextStep} />;
      case 3: return <Step3Form onNext={nextStep} />;
      case 4: return <Step4Form onNext={nextStep} />;
      case 5: return <Step5Form onNext={nextStep} />;
      case 6: return <Step6Form onNext={nextStep} />;
      case 7: return <Step7Form onNext={nextStep} />;
      default: return null;
    }
  };

  return (
    <>
      <StepFormsHeader />
      <ScrollView
        ref={scrollRef} // 👈 attach ref
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Step Indicator */}
        <View style={styles.progressSection}>
          <Text style={styles.stepText}>Step {step} of {totalSteps}</Text>
          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>

        {/* Back Button */}
        {step > 1 && (
          <TouchableOpacity style={styles.backButton} onPress={prevStep}>
            <Image
              source={require('../../assets/images/backArrow.png')}
              style={styles.backIcon}
            />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}

        {/* Form Section */}
        {renderStep()}

        {/* Skip Button */}
        {step !== 1 && step !== 7 && (
          <TouchableOpacity style={styles.skipBtn} onPress={nextStep}>
            <Text style={styles.skipText}>Skip for Now</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </>
  );
};

export default BecomePartnerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 10,
    backgroundColor: "#fff"
  },
  progressSection: {
    marginBottom: 16,
  },
  stepText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 6,
  },
  progressBackground: {
    height: 6,
    backgroundColor: '#d3d3d3',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    backgroundColor: '#06020a',
    borderRadius: 3,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
    marginRight: 6,
  },
  backText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },
  skipBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 14,
  },
  skipText: {
    color: '#555',
    fontSize: 15,
    fontWeight: '500',
  },
});
 