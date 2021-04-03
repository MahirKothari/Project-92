import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import db from "../config";
import firebase from "firebase";

export default class WelcomeScreen extends Component {
    constructor() {
      super();
      this.state = {
        emailId: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        contact: "",
        confirmPassword: "",
        isModalVisible: "false",
      };
    }

    userSignUp = (emailId, password, confirmPassword) => {
        if (password !== confirmPassword) {
          return alert("password doesn't match\nCheck your password.");
        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(emailId, password)
            .then(() => {
              db.collection("users").add({
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                contact: this.state.contact,
                email_id: this.state.emailId,
                address: this.state.address,
                IsBookRequestActive: false,
              });
              return alert("User Has Been Added Successfully", "", [
                {
                  text: "OK",
                  onPress: () => this.setState({ isModalVisible: false }),
                },
              ]);
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              return alert(errorMessage);
            });
        }
      };
    
     /* userLogin = (emailId, password) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(emailId, password)
         // .then(() => {
            //this.props.navigation.navigate("DonateBooks");
         // })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
          });
         };*/

      render(){
          return(
              <View style = {styles.container}>
                 <TextInput 
                 style = {styles.loginBox}
                 placeholder="abc@example.com"
            placeholderTextColor="orange"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
                />
            <TextInput
            style={[styles.loginBox,{marginTop:RFValue(15)}]}
            secureTextEntry={true}
            placeholder="Enter Password"
            placeholderTextColor="orange"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
              </View>
          )
      }   
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#6fc0b8",
    },
    loginBox: {
      width: "80%",
      height: RFValue(50),
      borderWidth: 1.5,
      borderColor: "#ffffff",
      fontSize: RFValue(20),
      paddingLeft: RFValue(10),
    },
})