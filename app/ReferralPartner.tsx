import React, {useState} from "react";
import { Text, View, ScrollView, StyleSheet,ImageBackground, TouchableOpacity  } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "expo-router";

const ReferralPartner = () => {
    const navigation: any = useNavigation();
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [fontsLoaded] = useFonts({
      Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
    });
    const referrals = [
        { id: "1", name: "Referral A", type: "Home Loan", status: "Pending", amount: "50 Lakhs", dueDate: "2024-12-31", details: "This is referral A's details." },
        { id: "2", name: "Referral B", type: "Car Loan", status: "Approved", amount: "20 Lakhs", dueDate: "2025-01-15", details: "This is referral B's details." },
        { id: "3", name: "Referral C", type: "Business Loan", status: "Rejected", amount: "80 Lakhs", dueDate: "2024-11-30", details: "This is referral C's details." },
        { id: "4", name: "Referral D", type: "Personal Loan", status: "Approved", amount: "10 Lakhs", dueDate: "2024-12-15", details: "This is referral D's details." },
    ];
    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id); // Toggle the expanded state
    };

   
      
      if (!fontsLoaded) {
        return <AppLoading />;
      }
       return (
        <ImageBackground
              source={require('../assets/images/index.jpg')}
              style={styles.container}
              resizeMode="cover">
               
            <View style={styles.row}>
                        <TouchableOpacity
                          onPress={() => navigation.navigate('DashboardScreen')} >
                          <Icon name="chevron-left" size={40} color="#FFF" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Referral Partner</Text>
            </View>   
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddReferral')} >
                            <Text style={styles.buttonText}>ADD REFERRALS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonOne} onPress={() => navigation.navigate('Profile')}  >
                            <Text style={styles.buttonText}> PROFILE </Text>
                    </TouchableOpacity>          
                </View>
                <View style={styles.stepContainer}>
                <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                    {referrals.map((referral) => (
                        <TouchableOpacity
                            key={referral.id}
                            onPress={() => toggleExpand(referral.id)}
                            style={styles.card}
                        >
                            <View style={styles.cardHeader}>
                                <View>
                                    <Text style={styles.referralName}>{referral.name}</Text>
                                    <Text style={styles.referralType}>{referral.type}</Text>
                                </View>
                                <View>
                                    <Text style={styles.referralStatus}>{referral.status}</Text>
                                    <Text style={styles.referralAmount}>{referral.amount}</Text>
                                </View>
                            </View>
                            {expandedId === referral.id && (
                                <View style={styles.cardDetails}>
                                    <Text style={styles.detailText}>ID: {referral.id}</Text>
                                    <Text style={styles.detailText}>Due Date: {referral.dueDate}</Text>
                                    <Text style={styles.detailText}>Details: {referral.details}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView> 
                </View>
            </ImageBackground>
                 
              );
};


const styles = StyleSheet.create({
     container:{
        flex:1,
    },
     stepContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 30,
        flex: 1,
        marginTop:'5%',
        display: "flex",
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '10%',
        marginLeft:'3%',
      },
      title: {
        color: '#FFF',
        fontSize: 26,
        fontWeight: '700',
        fontFamily: 'Lato',
        marginLeft:'15%'
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal:30,
        marginTop: '5%',
    },
      button: {
        backgroundColor: '#622CFD',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
      },
      buttonOne: {
        backgroundColor: '#622CFD',
        paddingVertical: 10,
        paddingHorizontal: 45,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'Lato',
        lineHeight: 24,
      },
      content: {
        flex: 1,
      },
      scrollContent: {
        flexGrow: 1,
        // justifyContent: 'center',
      },
      text:{
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'Lato',
        color:'#000',
        padding:'3%'
      },
      card: {
        backgroundColor: "#F8F8F8",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardDetails: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#DDD",
    },
    referralName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    referralType: {
        fontSize: 14,
        color: "#555",
    },
    referralStatus: {
        fontSize: 14,
        color: "#555",
        textAlign: "right",
    },
    referralAmount: {
        fontSize: 16,
        fontWeight: "700",
        color: "#28A745",
        textAlign: "right",
    },
    detailText: {
        fontSize: 14,
        color: "#333",
        marginBottom: 5,
    },
});

export default ReferralPartner;