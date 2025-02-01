import { Text, View, StyleSheet, FlatList, ScrollView, SafeAreaView } from "react-native";
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

interface User {
  createdAt: string;
  userName: string;
  country: string;
  id: string;
}

enum SortBy {
  None = "None",
  CreationTimeAscending = "Creation Time (Ascending)",
  CreationTimeDescending = "Creation Time (Descending)"
}

const PersonRow = (props: { user: User }) => (
  <View>
    <Text style={styles.text} id={props.user.id}>User: {props.user.userName} Country: {props.user.country} Created At: {props.user.createdAt}</Text>
  </View>
);

export default function Index() {
  const [data, setData] = useState<User[] | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.None);
  const [countryFilter, setCountryFilter] = useState<string>("None");

  useEffect(() => {
    fetch("https://6799ee3d747b09cdcccd06bc.mockapi.io/api/v1/users")
      .then(response => response.json())
      .then((data: User[]) => setData(data));
  }, []);

  if (data !== null) {
    let countries = data.map(user => user.country);
    let uniqueCountries = [...new Set(countries)];

    let filteredData = [...data];
    if (countryFilter !== "None") {
      filteredData = filterByCountry(filteredData, countryFilter);
    }

    if (sortBy === SortBy.CreationTimeAscending) {
      filteredData = sortByCreationTime(filteredData, true);
    } else if (sortBy === SortBy.CreationTimeDescending) {
      filteredData = sortByCreationTime(filteredData, false);
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          <Picker 
            selectedValue={countryFilter}
            onValueChange={setCountryFilter}
          >
            <Picker.Item label="None" value="None" />
            {
              uniqueCountries.map(c => {
                return <Picker.Item label={c} value={c} />
              })
            }
          </Picker>
          <Picker 
            selectedValue={sortBy}
            onValueChange={setSortBy}
          >
            <Picker.Item label="None" value={SortBy.None} />
            <Picker.Item label="Creation Time (Acending)" value={SortBy.CreationTimeAscending} />
            <Picker.Item label="Creation Time (Descending)" value={SortBy.CreationTimeDescending} />
          </Picker>
          <FlatList 
            data={filteredData}
            renderItem={({ item }) => <PersonRow user={item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.list}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  picker: {
    // picker styles
  },
  list: {
    // list styles
  },
  text: {
    fontSize: 25,
    color: "black",
  },
  text2: {
    fontSize: 25,
    color: "green",
  },
  about: {
    fontSize: 25,
    color: "blue",
    textDecorationLine: "underline",
  }
});


function filterByCountry(data: User[], country: string) : User[] {
  return data.filter(user => user.country === country);
}

function sortByCreationTime(data: User[], ascending: boolean) {
  if (ascending) {
    return data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } else {
    return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}