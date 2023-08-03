import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from '@react-navigation/native'

const ProductList = ({ item ,contact}) => {
    console.log('Product List ++++++++++++ ')


    console.log("contact Iist",contact)

    const navigation = useNavigation();
    const { productName, productCost } = item

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { item: item, contact:contact})}>
            <View style={[styles.box]} >
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://cdn.pixabay.com/photo/2014/08/05/10/30/iphone-410324_1280.jpg',
                    }}
                />
                <Text style={styles.textFam}>{productName}</Text>
                <Text style={styles.textPrice}>Price : {productCost} QAR</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    box: {
        marginTop: 25,
        marginLeft: 45,
        width: 130,
        height: 140,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor:"#ffa600"
       
    },
    textFam: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
        color: "black",
        fontSize: 15,
        letterSpacing: 0.3
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    textPrice: {
        color: "#808080"
    }
});

export default ProductList;
