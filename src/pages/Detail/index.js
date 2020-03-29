import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import { useNavigation, useRoute }  from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import { ScrollView } from 'react-native-gesture-handler';

export default function Detail(){

    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Hello ${incident.name}, I am interested in helping in the incident ${incident.title}, with the amount of ${Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(incident.value)}`;

    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Hero of the incident: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return(
        
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <TouchableOpacity onPress={ navigateBack }>
                        <Feather name="arrow-left" size={28} color='#e02041'/>
                    </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0} ]}>Incident:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>NGO:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>Description:</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>

                <Text style={styles.incidentProperty}>Value:</Text>
                <Text style={styles.incidentValue}>{
                        Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(incident.value)}
                    </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Save the day!</Text>
                <Text style={styles.heroTitle}>Be the hero of this incident</Text>
                <Text style={styles.heroDescription}>Get in touch</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={ sendWhatsapp }>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={  sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </View>
        
    );

}