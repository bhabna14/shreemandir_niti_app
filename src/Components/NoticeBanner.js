import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import TextTicker from 'react-native-text-ticker';

const NoticeBanner = ({ noticeText }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.label}>📢 Notice:</Text>
            <View style={styles.marqueeWrapper}>
                <TextTicker
                    style={styles.noticeText}
                    duration={8000}
                    loop
                    bounce={false}
                    repeatSpacer={70}
                    // marqueeDelay={0}
                >
                    {noticeText}
                </TextTicker>
            </View>
        </View>
    );
};

export default NoticeBanner;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFF3E0',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        overflow: 'hidden',
        borderBottomColor: '#ffcc80',
        borderBottomWidth: 1,
    },
    label: {
        fontWeight: '700',
        color: '#e65100',
        marginRight: 10,
        fontSize: 14,
    },
    marqueeWrapper: {
        flex: 1,
        overflow: 'hidden',
    },
    noticeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4e342e',
        whiteSpace: 'nowrap',
    },
});
