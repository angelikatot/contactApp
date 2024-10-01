import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useState } from 'react';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      // only contacts with nummbers
      const filteredContacts = data.filter(contact => contact.phoneNumbers && contact.phoneNumbers.length > 0);
      setContacts(filteredContacts);
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text>{item.name}</Text>
      <Text>{item.phoneNumbers[0].number}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Get Contacts" onPress={getContacts} />
      {contacts.length > 0 ? (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : (
        <Text>No contacts fetched yet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
