import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';

// Local icons
const FAQ_ICON = require('../../assets/images/help.png');
const CONTACT_ICON = require('../../assets/images/contact.png');
const TICKET_ICON = require('../../assets/images/globe.png');

const HelpAndSupportFilter = ({ filters, activeFilter, setActiveFilter }) => {
    const icons = {
        FAQ: FAQ_ICON,
        Contact: CONTACT_ICON,
        "My Tickets": TICKET_ICON,
    };

    return (
        <View style={styles.container}>
            {filters.map((filter) => (
                <TouchableOpacity
                    key={filter}
                    style={[
                        styles.button,
                        activeFilter === filter && styles.activeButton,
                    ]}
                    onPress={() => setActiveFilter(filter)}
                >
                    <Image
                        source={icons[filter]}
                        style={[
                            styles.icon,
                            activeFilter === filter && styles.activeIcon,
                        ]}
                    />
                    <Text
                        style={[
                            styles.text,
                            activeFilter === filter && styles.activeText,
                        ]}
                    >
                        {filter}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default HelpAndSupportFilter;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 10,
        marginTop: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    activeButton: {
        backgroundColor: '#000', // dark background for active
        borderColor: '#000',
    },
    icon: {
        width: 16,
        height: 16,
        marginRight: 6,
        tintColor: '#000',
    },
    activeIcon: {
        tintColor: '#fff',
    },
    text: {
        color: '#000',
        fontSize: 14,
    },
    activeText: {
        color: '#fff',
        fontWeight: '600',
    },
});
