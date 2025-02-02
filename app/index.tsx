import { Text, View, FlatList, SafeAreaView, TextInput, Platform, KeyboardAvoidingView } from "react-native";
import { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Pagination from "./components/Pagination";
import UserRow, { User } from "./components/User";
import { filterByCountry, sortByCreationTime } from "./utils/userUtils";
import { SortBy, USERS_URL } from "./types";
import { styles } from "./styles/index.styles";

export default function Index() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.None);
  const [countryFilter, setCountryFilter] = useState<string>("None");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [search, setSearch] = useState<string>("");

  // Dropdown states
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
    filteredData = filteredData.filter(user => 
      user.userName.toLowerCase().includes(search.toLowerCase())
    );
  } 

  const pageCount = Math.ceil(filteredData.length / pageSize);
  const getPageData = (page: number): User[] => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  };

  if (users === null) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const uniqueCountries = [...new Set(users.map(user => user.country))];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
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
          keyboardShouldPersistTaps="handled"
          ListFooterComponent={() => (
            <Pagination 
              callbackHandler={(i) => setPage(i)}
              currentPage={page}
              totalPages={pageCount}
            />
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
