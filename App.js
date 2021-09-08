import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from "react-native";

export default function App() {
  const [estado, setarEstado] = useState("leitura");
  const [anotacao, setarAnotacao] = useState('');

  useEffect(() =>{
    //Quando inicializar o app, queremos que leia o ray anotacao.
    (async () => {
      try{
        const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
        setarAnotacao(anotacaoLeitura)
      }catch(error){}
    })
  },[])

  setData = async() => {
    try{
      await AsyncStorage.setItem('anotacao',anotacao);
    }catch(error){

    }

    alert("Sua anotação foi salva");
  }

  function atualizarTexto(){
    setarEstado('leitura')
    setData()
  }

  if (estado == "leitura") {
    //Pagina 1
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style="light" backgroundColor={"transparent"} />
        <View style={styles.header}>
          <Text style={{ textAlign: "center", color: "#fff", fontSize: 18 }}>
            Minhas Anotações
          </Text>
        </View>
        {
          (anotacao != '')?
          <View style={{ padding: 30 }}>
            <Text styles={styles.anotacao}>{anotacao}</Text>
          </View>
          :
          <View style={{ padding: 30 }}><Text style={{opacity:0.3}}>Nenhuma nota salva.</Text></View>
        }
        <TouchableOpacity
          style={styles.btnAnotacao}
          onPress={() => setarEstado("atualizando")}>
          {
            (anotacao == '')?
            <Text style={styles.btnAnotacaoTexto}>+</Text>
            :
            <Text style={styles.btnEditarTexto}>Editar</Text>
          }
        </TouchableOpacity>
      </View>
    );
  } //Fim da pagina 1
  else if (estado == "atualizando") {
    //Pagina 2
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style="light" backgroundColor={"transparent"} />
        <View style={styles.header}>
          <Text style={{ textAlign: "center", color: "#fff", fontSize: 18 }}>
            Minhas Anotações
          </Text>
        </View>

        <TextInput autoFocus={true} style={{padding:20 ,height:300, textAlignVertical: "top"}} onChangeText={(text)=>setarAnotacao(text)} multiline={true} numberOfLines={5} value={anotacao}></TextInput>

        <TouchableOpacity
          style={styles.btnSalvar}
          onPress={() => atualizarTexto()}
        >
          <Text style={styles.btnSalvarTexto}>Salvar</Text>
        </TouchableOpacity>
      </View>
    );
  } //Fim da pagina 2
} // Fim da função

const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 20,
    backgroundColor: "#069",
  },
  anotacao: {
    fontSize: 13,
  },
  btnAnotacao: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    backgroundColor: "#069",
    borderRadius: 25,
  },
  btnAnotacaoTexto: {
    color: "white",
    position: "relative",
    textAlign: "center",
    top: 3,
    fontSize: 30,
  },
  btnEditarTexto: {
    color: "white",
    textAlign: "center",
    marginTop: 16,
    fontSize: 12,
  },
  btnSalvar: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#069",
    borderRadius: 25,
  },
  btnSalvarTexto: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
  },
});
