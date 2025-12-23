import React, { useState, useEffect, useContext, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    FlatList,
    Image,
    Pressable,
    Alert,
    Keyboard,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../context/AppContext";

// keyboard refocus
import useKeyboardVisibility from "../../utils/useKeyboardVisibility";

const CLOCK_ICON = require("../../assets/images/clock.png");

const RaiseTicketScreen = ({ navigation }) => {

    const { API_BASE_URL } = useContext(AppContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [description, setDescription] = useState("");
    const [tickets, setTickets] = useState([]);
    const [subject, setSubject] = useState("");
    const subjectRef = useRef(null);


    const [loading, setLoading] = useState(false);

    // GET TICKETS
    const fetchTickets = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const res = await axios.get(`${API_BASE_URL}/user/ticket`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("my all tickets : ", res.data);

            setTickets(res.data.data || []);
        } catch (err) {
            console.log("Fetch tickets error:", err);
            Alert.alert("Error", "Failed to fetch tickets");
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    // refocus state and function 
    const keyboardVisibleRef = useKeyboardVisibility();
    const descriptionRef = useRef(null);
    const refocusIfKeyboardHidden = async (inputRef) => {
        if (keyboardVisibleRef.current) return;

        Keyboard.dismiss(); // hide keyboard if any
        await new Promise((r) => setTimeout(r, 50)); // small delay
        inputRef?.focus(); // refocus input
    };

    // CREATE TICKET
    const submitTicket = async () => {
        if (!description.trim()) {
            Alert.alert("Error", "Please describe your issue");
            return;
        }

        try {
            setLoading(true);
            const token = await AsyncStorage.getItem("token");

            await axios.post(`${API_BASE_URL}/user/ticket/create`,
                { subject: subject.trim(), description: description.trim() },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            setSubject("");
            setDescription("");

            setModalVisible(false);
            fetchTickets();
            Alert.alert("Success", "Ticket created successfully!");
        }

        catch (error) {
            console.log("Create ticket failed:", error?.response);

            if (error?.response) {
                Alert.alert("Error", error?.response?.data?.message);
            } else if (!error?.response) {
                Alert.alert("Error", "Network error. Please check your internet connection.");
            } else {
                Alert.alert("Error", "Something went wrong.");
            }
        }

        finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        if (status === 'Open') return styles.open;
        if (status === 'Pending') return styles.pending;
        return styles.closed;
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return `${date.toLocaleDateString()}`;
    };

    // EACH TICKET CARD
    const TicketCard = ({ item }) => (
        <TouchableOpacity style={styles.ticketCard}>
            <View style={styles.cardHeader}>
                <View style={styles.ticketIdContainer}>
                    <Text style={styles.ticketId}>Ticket id : #{item._id.slice(-6)}</Text>
                </View>
                <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
                    <Text style={styles.statusText}>Status : {item.status}</Text>
                </View>
            </View>

            <Text style={styles.description}>
                <Text style={[styles.description, { fontWeight: "800" }]}>Subject : </Text> {item.subject}
            </Text>

            <Text style={styles.description}>
                <Text style={[styles.description, { fontWeight: "800" }]}>Description : </Text>  {item.description}
            </Text>

            <View style={styles.cardFooter}>
                <View style={styles.dateContainer}>
                    <Image source={CLOCK_ICON} style={styles.clockIcon} />
                    <Text style={styles.date}>Created at : {formatDate(item.createdAt)}</Text>
                </View>

                {item.agentInfo && (
                    <Text style={styles.agentText}>Agent: {item.agentInfo.name}</Text>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Image
                        source={require("../../assets/images/backArrow.png")}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Support Tickets</Text>

                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.plusBtn}>
                    <Image
                        source={require("../../assets/images/plus.png")}
                        style={styles.plusIcon}
                    />
                </TouchableOpacity>
            </View>

            {/* CREATE TICKET BUTTON */}
            <TouchableOpacity
                style={styles.createBtn}
                onPress={() => setModalVisible(true)}
            >
                <Image source={require("../../assets/images/plus.png")} style={styles.createBtnIcon} />
                <Text style={styles.createBtnText}>Create New Ticket</Text>
            </TouchableOpacity>

            {/* TICKET LIST */}
            <View style={styles.listHeader}>
                <Text style={styles.listTitle}>Previous Tickets statuses</Text>
                {/* <Text style={styles.ticketCount}>({tickets.length})</Text> */}

            </View>
            {/* <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                    Once you raise a ticket, our support team will contact you as soon as possible.
                </Text>
            </View> */}

            <FlatList
                data={tickets}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <TicketCard item={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}

                ListHeaderComponent={
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>
                            Once you raise a ticket, our support team will contact you as soon as possible.
                        </Text>
                    </View>
                }

                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No tickets created yet</Text>
                        <Text style={styles.emptySubText}>Create your first ticket above</Text>
                    </View>
                }
            />

            {/* MODAL */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <ScrollView
                        contentContainerStyle={{}}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Create New Ticket</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <Text style={styles.closeBtn}>✕</Text>
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                ref={subjectRef}
                                style={[styles.textArea, { minHeight: 50 }]}
                                placeholder="Enter subject..."
                                placeholderTextColor="#999"
                                value={subject}
                                onChangeText={setSubject}
                                onPressIn={() => refocusIfKeyboardHidden(subjectRef.current)}
                            />

                            <TextInput
                                ref={descriptionRef}
                                style={styles.textArea}
                                placeholder="Describe your issue in detail..."
                                placeholderTextColor="#999"
                                value={description}
                                onChangeText={setDescription}
                                multiline
                                numberOfLines={5}
                                textAlignVertical="top"
                                onPressIn={() => refocusIfKeyboardHidden(descriptionRef.current)}
                            />

                            <View style={styles.modalActions}>
                                <Pressable
                                    style={[styles.modalBtn, styles.cancelBtn]}
                                    onPress={() => setModalVisible(false)}
                                    disabled={loading}
                                >
                                    <Text style={styles.cancelBtnText}>Cancel</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.modalBtn, styles.submitBtn, loading && styles.disabledBtn]}
                                    onPress={submitTicket}
                                    disabled={loading}
                                >
                                    <Text style={styles.submitBtnText}>
                                        {loading ? "Creating..." : "Create Ticket"}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

export default RaiseTicketScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
    },
    // HEADER
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: "#B91C1C",
    },
    backBtn: {
        padding: 5,
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: "#FFFFFF",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    plusBtn: {
        padding: 5,
    },
    plusIcon: {
        width: 24,
        height: 24,
        tintColor: "#FFFFFF",
    },
    // CREATE BUTTON
    createBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#B91C1C",
        margin: 20,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        justifyContent: "center",
        gap: 10,
        elevation: 3,
        shadowColor: "#B91C1C",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    createBtnIcon: {
        width: 20,
        height: 20,
        tintColor: "#FFFFFF",
    },
    createBtnText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
    // LIST HEADER
    listHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111",
        marginRight: 8,
    },
    ticketCount: {
        fontSize: 16,
        color: "#B91C1C",
        fontWeight: "600",
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    // TICKET CARD
    ticketCard: {
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    ticketIdContainer: {
        backgroundColor: "#F8F9FF",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    ticketId: {
        fontSize: 12,
        fontWeight: "600",
        color: "#B91C1C",
    },
    statusBadge: {
        borderRadius: 6,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    statusText: {
        fontSize: 11,
        color: "#FFFFFF",
        fontWeight: "600",
    },
    open: { backgroundColor: "#B91C1C" },
    pending: { backgroundColor: "#FFB800" },
    closed: { backgroundColor: "#999" },
    description: {
        fontSize: 14,
        color: "#333",
        lineHeight: 20,
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    clockIcon: {
        width: 12,
        height: 12,
        marginRight: 4,
        tintColor: "#666",
    },
    date: {
        fontSize: 12,
        color: "#666",
    },
    agentText: {
        fontSize: 11,
        color: "#B91C1C",
        fontWeight: "500",
    },
    // EMPTY STATE
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 50,
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
        marginBottom: 8,
    },
    emptySubText: {
        fontSize: 14,
        color: "#999",
    },
    // MODAL
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        // alignItems: "center",
        padding: 10,
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 0,
        width: "100%",
        maxWidth: 400,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333",
    },
    closeBtn: {
        fontSize: 20,
        color: "#666",
        fontWeight: "bold",
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#E2E2E2",
        borderRadius: 12,
        padding: 16,
        margin: 20,
        fontSize: 16,
        color: "#333",
        textAlignVertical: "top",
        minHeight: 120,
        backgroundColor: "#FAFAFA",
    },
    modalActions: {
        flexDirection: "row",
        padding: 20,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
    },
    modalBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    cancelBtn: {
        backgroundColor: "#F8F9FA",
    },
    submitBtn: {
        backgroundColor: "#B91C1C",
    },
    disabledBtn: {
        opacity: 0.6,
    },
    cancelBtnText: {
        color: "#666",
        fontSize: 16,
        fontWeight: "600",
    },
    submitBtnText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
    // raise ticket
    infoBox: {
        marginHorizontal: 0,
        backgroundColor: "#E8F1FF",
        borderLeftWidth: 4,
        borderLeftColor: "#B91C1C",
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
    },
    infoText: {
        color: "#B91C1C",
        fontSize: 14,
        fontWeight: "600",
    },

});