import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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