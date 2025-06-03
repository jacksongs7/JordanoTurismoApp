// app/(tabs)/reserveForm.tsx

// 1. Importa o componente ReserveFormScreen da sua localização original
//    dentro da pasta 'app/src/(tabs)/'.
//    O caminho '../src/(tabs)/reserveForm' é relativo a este arquivo.
//    - '..' sobe para a pasta 'app/'
//    - 'src/' entra na pasta 'app/src/'
//    - '(tabs)/' entra na pasta 'app/src/(tabs)/'
//    - 'reserveForm' refere-se ao arquivo 'reserveForm.tsx' dentro dela.
import ReserveFormScreen from '../src/(tabs)/reserveForm';

// 2. Reexporta o componente importado.
//    Isso torna o ReserveFormScreen disponível para o Expo Router
//    quando ele procura por uma tela chamada 'reserveForm'
//    definida no arquivo app/(tabs)/_layout.tsx.
export default ReserveFormScreen;