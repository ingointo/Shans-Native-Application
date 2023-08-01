import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import axios from "axios";

import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "../../api/const";
import ProductList from "../productList";

const CustomButton = ({ title, onPress }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonContent}>
                    <AntDesign name="left" size={20} color="black" style={styles.icon} />
                    <Text style={styles.buttonText}>{title}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const searchUrl = `${baseUrl}/viewProducts?product_name=`;

const ProductScreen = () => {
    const numColumns = 2;
    const navigation = useNavigation();

    const productUrl = `${baseUrl}/viewProducts`;

    const [productNames, setProductNames] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        axios.get(productUrl)
            .then((res) => {
                const productNamesArr = res.data.data.map((item) => ({
                    _id: item._id, // Add missing _id property
                    productName: item.product_name,
                    productCost: item.cost
                }));
                setProductNames(productNamesArr);
                setFilteredProducts(productNamesArr);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (searchQuery !== "") { 
            axios.get(searchUrl + searchQuery)
                .then((res) => {
                    const filteredSearchResults = res.data.data.map((item) => ({
                        _id: item._id, 
                        productName: item.product_name,
                        productCost: item.cost
                    }));
                    setFilteredProducts(filteredSearchResults);
                })
                .catch(err => console.log(err));
        } else {
            setFilteredProducts(productNames);
        }
    }, [searchQuery, productNames]);

    const onChangeSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <View style={styles.container}>
            <View>
                <CustomButton title="Products" onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Search Products"
                    value={searchQuery}
                    onChangeText={onChangeSearch}
                    style={styles.searchBox}
                />
            </View>
            <View style={styles.productListContainer}>
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item._id} 
                    renderItem={({ item }) => <ProductList item={item} />}
                    numColumns={numColumns}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBox: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ffa600',
        backgroundColor: "white",
        marginBottom: 10,
    },
    buttonContainer: {
        backgroundColor: "#ffa600",
    },
    buttonContent: {
        flexDirection: "row",
        marginLeft: 10,
        marginBottom: 12,
        alignItems: "center"
    },
    icon: {
        fontSize: 18,
    },
    buttonText: {
        marginLeft: 34,
        fontSize: 18,
        color: "white"
    },
    searchContainer: {
        backgroundColor: "#ffa600",
        paddingHorizontal: 10, 
    },
   
});

export default ProductScreen;
