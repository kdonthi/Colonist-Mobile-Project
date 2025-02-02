import { Text, View, StyleSheet, FlatList, ScrollView, SafeAreaView, TextInput, Platform } from "react-native";
import { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Pagination from "./components/Pagination";
import UserRow, { User } from "./components/User";

const USERS_URL = "https://6799ee3d747b09cdcccd06bc.mockapi.io/api/v1/users";

enum SortBy {
  None = "None",
  CreationTimeAscending = "Creation Time (Ascending)",
  CreationTimeDescending = "Creation Time (Descending)"
}

export default function Index() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.None);
  const [countryFilter, setCountryFilter] = useState<string>("None");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [search, setSearch] = useState<string>("");

  // Add open states for dropdowns
  const [countryOpen, setCountryOpen] = useState(false);
  const [sortByOpen, setSortByOpen] = useState(false);
  const [pageSizeOpen, setPageSizeOpen] = useState(false);

  useEffect(() => {
    fetch(USERS_URL)
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

  if (search) {
    filteredData = filteredData.filter(user => user.userName.toLowerCase().includes(search.toLowerCase()));
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
        <View style={styles.dropdownSection}>
          <DropDownPicker
            open={countryOpen}
            setOpen={setCountryOpen}
            value={countryFilter}
            setValue={setCountryFilter}
            items={[
              { label: "Select Country", value: "None" },
              ...uniqueCountries.map(c => ({ label: c, value: c }))
            ]}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
            zIndex={3000}
          />

          <DropDownPicker
            open={sortByOpen}
            setOpen={setSortByOpen}
            value={sortBy}
            setValue={setSortBy}
            items={[
              { label: "Sort By", value: SortBy.None },
              { label: "Creation Time (Ascending)", value: SortBy.CreationTimeAscending },
              { label: "Creation Time (Descending)", value: SortBy.CreationTimeDescending }
            ]}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
            zIndex={2000}
          />

          <DropDownPicker
            placeholder="Results Per Page"
            open={pageSizeOpen}
            setOpen={setPageSizeOpen}
            value={pageSize}
            setValue={setPageSize}
            items={[
              { label: "15", value: 15 },
              { label: "20", value: 20 },
              { label: "25", value: 25 },
              { label: "30", value: 30 }
            ]}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
            zIndex={1000}
          />
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search by user name"
          onChangeText={setSearch}
          value={search}
          placeholderTextColor="#94a3b8"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FlatList 
          data={getPageData(page)}
          renderItem={({ item }) => <UserRow user={item} />}
          keyExtractor={(item) => item.id}
          style={styles.list}
          ListFooterComponent={() => (
            <Pagination 
              callbackHandler={(i) => setPage(i)}
              currentPage={page}
              totalPages={pageCount}
            />
          )}
        />
      </SafeAreaView>
    );
  }
  
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  )
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
    position: 'relative',
  },
  dropdownSection: {
    gap: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    zIndex: 3000, // This is important for dropdowns to show properly
  },
  dropdown: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
    borderRadius: 8,
    marginVertical: 5,
    minHeight: 50,
  },
  dropdownContainer: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  dropdownText: {
    fontSize: 16,
    color: '#334155',
  },
  searchInput: {
    backgroundColor: '#f8fafc',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    height: 50,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 15,
    fontSize: 16,
    color: '#334155',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
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
