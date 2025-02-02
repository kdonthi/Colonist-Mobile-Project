import { View, Text, StyleSheet } from "react-native";

export interface User {
    createdAt: string;
    userName: string;
    country: string;
    id: string;
}

export default function UserRow(props: { user: User }) {
    return (
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
}


const styles = StyleSheet.create({
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