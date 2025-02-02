import { Text, View, StyleSheet, FlatList, ScrollView, SafeAreaView } from "react-native";
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import Pagination from "./components/Pagination";

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
  <View style={styles.text}>
    <View style={styles.rowContainer}>
      <View style={styles.column}>
        <Text style={styles.label}>User</Text>
        <Text style={styles.value}>{props.user.userName}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.label}>Country</Text>
        <Text style={styles.value}>{props.user.country}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.label}>Created At</Text>
        <Text style={styles.value}>{new Date(props.user.createdAt).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true, timeZoneName: 'short' })}</Text>
      </View>
    </View>
  </View>
);

export default function Index() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.None);
  const [countryFilter, setCountryFilter] = useState<string>("None");
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;

  useEffect(() => {
    fetch("https://6799ee3d747b09cdcccd06bc.mockapi.io/api/v1/users")
      .then(response => response.json())
      .then((data: User[]) => {
        setUsers(data);
      });
  }, []);

  if (!users) return (
    <View>
      <Text>Loading...</Text>
    </View>
  );

  let filteredData = [...users];
  if (countryFilter !== "None") {
    filteredData = filterByCountry(filteredData, countryFilter);
  }

  if (sortBy === SortBy.CreationTimeAscending) {
    filteredData = sortByCreationTime(filteredData, true);
  } else if (sortBy === SortBy.CreationTimeDescending) {
    filteredData = sortByCreationTime(filteredData, false);
  }

  let pageCount = Math.ceil(filteredData.length / pageSize);

  const getPageData = (page: number): User[] => {
    // Paginate the data
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  };

  if (users !== null) {
    let countries = users.map(user => user.country);
    let uniqueCountries = [...new Set(countries)];

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          <Picker 
            style={styles.picker} 
            selectedValue={countryFilter}
            onValueChange={setCountryFilter}
          >
            <Picker.Item label="Select Country" value="None" />
            {uniqueCountries.map(c => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
          <Picker
            style={styles.picker} 
            selectedValue={sortBy}
            onValueChange={setSortBy}
          >
            <Picker.Item label="Sort By" value={SortBy.None} />
            <Picker.Item label="Creation Time (Ascending)" value={SortBy.CreationTimeAscending} />
            <Picker.Item label="Creation Time (Descending)" value={SortBy.CreationTimeDescending} />
          </Picker>
          <FlatList 
            data={getPageData(page)}
            renderItem={({ item }) => <PersonRow user={item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.list}
          />
          <Pagination 
            callbackHandler={(i) => setPage(i)}
            currentPage={page}
            totalPages={pageCount}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  )
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
    backgroundColor: '#f8fafc',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    height: 50,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  list: {
    flex: 1,
    paddingHorizontal: 15,
    marginVertical: 15,
    backgroundColor: '#f1f5f9',
  },
  text: {
    fontSize: 16,
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 12,
    shadowColor: "#1e293b",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  column: {
    flex: 1,
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },
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