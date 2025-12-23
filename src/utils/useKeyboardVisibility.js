import { useEffect, useRef } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardVisibility = () => {
    const keyboardVisibleRef = useRef(false);

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => {
            keyboardVisibleRef.current = true;
            console.log('⌨️ Keyboard is visible');
        });

        const hideSub = Keyboard.addListener('keyboardDidHide', () => {
            keyboardVisibleRef.current = false;
            console.log('⌨️ Keyboard is hidden');
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    return keyboardVisibleRef;
};

export default useKeyboardVisibility;



// // usage
//      <TextInput
//                             ref={descriptionRef}
//                             style={styles.textArea}
//                             placeholder="Describe your issue in detail..."
//                             placeholderTextColor="#999"
//                             value={description}
//                             onChangeText={setDescription}
//                             multiline
//                             numberOfLines={5}
//                             textAlignVertical="top"
//                             onPressIn={() => refocusIfKeyboardHidden(descriptionRef.current)}
//                         />


//                             // refocus state and function
//     const keyboardVisibleRef = useKeyboardVisibility();
//     const descriptionRef = useRef(null);
//     const refocusIfKeyboardHidden = async (inputRef) => {
//         if (keyboardVisibleRef.current) return;

//         Keyboard.dismiss(); // hide keyboard if any
//         await new Promise((r) => setTimeout(r, 50)); // small delay
//         inputRef?.focus(); // refocus input
//     };
