import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {  EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import {auth} from '../services/firebaseConfig'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroScreen() {
  // Estados para armazenar os valores digitados
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const router = useRouter()//Hook para navegação

  // Função para simular o envio do formulário
  const handleAlterarSenha = async() => {
    if (!senhaAtual|| !novaSenha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
    if(novaSenha !=confirmarSenha){
        Alert.alert("Erro","As senhas não coincidem!")
        return;
    }
    if(novaSenha.length < 6){
        Alert.alert("Erro","A nova senha deve ter pelo menos 6 caracteres!")
        return;
    }
    try {
      const user = auth.currentUser;
        if (!user || !user.email) {
          Alert.alert('Erro', 'Usuário não encontrado.');
          return;
        }
        //Cria as credenciais de autenticação
        const credential = EmailAuthProvider.credential(user.email, senhaAtual);
        //Reautentica o usuário
        await reauthenticateWithCredential(user, credential);
        //Atualiza a senha do usuário
        await updatePassword(user, novaSenha);
        Alert.alert('Sucesso', 'Senha alterada com sucesso!');
        router.push('/HomeScreen');
    }  catch (error) {
        console.error('Erro ao alterar a senha:', error);
        Alert.alert('Erro', 'Não foi possível alterar a senha.');
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alterar Senha</Text>

      {/* Campo Senha Atual */}
      <TextInput
        style={styles.input}
        placeholder="Digite a senha atual"
        placeholderTextColor="#aaa"
        value={senhaAtual}
        onChangeText={setSenhaAtual}
      />

      {/* Campo Nova Senha*/}
      <TextInput
        style={styles.input}
        placeholder="Digite a nova senha"
        placeholderTextColor="#aaa"
        value={novaSenha}
        onChangeText={setNovaSenha}
      />

      {/* Campo Confirmar Senha*/}
      <TextInput
        style={styles.input}
        placeholder="Digite novamente a nova senha"
        placeholderTextColor="#aaa"
        //secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      {/* Botão */}
      <TouchableOpacity style={styles.botao} onPress={handleAlterarSenha}>
        <Text style={styles.textoBotao}>Alterar Senhar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  botao: {
    backgroundColor: '#b30000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});
