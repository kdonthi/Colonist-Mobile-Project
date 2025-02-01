import { useState, ReactNode } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// on click, do call back handler
// page numbers equal to the number of pages given
// current page is highlighted
// if current page is the first page, hide the previous button
// if current page is the last page, hide the next button

// args = callback handler, current page, total pages
interface PaginationProps {
    callbackHandler: (pageNumber: number) => void
    currentPage: number
    totalPages: number
}

export default function Pagination({callbackHandler, currentPage, totalPages}: PaginationProps) {
    return (
        <View style={styles.container}>
            <View style={styles.pageNumbersContainer}>
                {[...Array(totalPages)].map((_, i) => (
                    <PageNumber
                        key={i + 1}
                        pageNumber={i + 1}
                        onClick={() => callbackHandler(i + 1)}
                        isCurrent={currentPage === i + 1}
                    />
                ))}
            </View>
        </View>
    );
}

interface PageNumberProps {
    pageNumber: number;
    isCurrent: boolean;
    onClick: () => void;
}

function PageNumber(props: PageNumberProps) {
    return (
        <View>
            <Text style={props.isCurrent ? styles.currentPage : styles.pageNumber} onPress={props.isCurrent ? undefined : props.onClick}>
                {props.pageNumber}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10,
    },
    pageNumbersContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    pageNumber: {
        textDecorationLine: 'underline',
        color: "blue",
        padding: 5,
    },
    currentPage: {
        color: "black",
        padding: 5,
        fontWeight: 'bold',
    }
});
