import React, {useContext, useMemo, useRef} from 'react';
import {Animated, FlatList, StyleSheet, View} from 'react-native';
import {CardProveedor, Text} from '../components';
import {PropsStack} from '../routers/Auth';
import {useQuery} from '@tanstack/react-query';
import api from '../lib/api';
import {Proveedor, Tienda} from '../types/user';
import {AuthContex} from '../context/authContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../components/colors';

export const Home = ({navigation}: PropsStack<'Home'>) => {
  const {user} = useContext(AuthContex);
  const {data: dataP} = useQuery({
    queryKey: ['getProveedores'],
    queryFn: () => api.get('/proveedor'),
  });
  const {data: dataT} = useQuery({
    queryKey: ['getTiendas'],
    queryFn: () => api.get('/store'),
  });

  const proveedores: Proveedor[] = useMemo(
    () => dataP?.data?.data ?? [],
    [dataP],
  );
  const tiendas: Tienda[] = useMemo(
    () => dataT?.data?.data.filter((x: Tienda) => x.id !== user.tiendaId) ?? [],
    [dataT, user.tiendaId],
  );

  const scrollY = useRef(new Animated.Value(0)).current;
  const topInset = useSafeAreaInsets().top;
  const headerHeight = 300;

  const translateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [headerHeight - topInset, 0],
    extrapolate: 'clamp',
  });

  const translateYBack = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });

  return (
    <View>
      {/* Imagen de la tienda */}
      <Animated.Image
        source={{
          uri:
            user.tienda.img ??
            'https://res.cloudinary.com/dxarbtyux/image/upload/v1703315333/color-contrast-inspector/sample-5-avatar.webp',
        }}
        style={[
          styles.storeImageContainer,
          {transform: [{translateY: translateYBack}]},
        ]}
      />

      {/* Header flotante */}
      <Animated.View
        style={[
          styles.header,
          {transform: [{translateY}], height: topInset + 25},
        ]}>
        <Text style={styles.headerText}>{user.tienda.nombre}</Text>
      </Animated.View>

      {/* Lista de contenido */}
      <Animated.ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{marginTop: headerHeight}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={10}>
        <Text style={styles.sectionTitle}>Proveedores:</Text>
        <FlatList
          horizontal
          data={proveedores}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={CardProveedor}
        />

        <Text style={styles.sectionTitle}>Tiendas:</Text>
        <FlatList
          horizontal
          data={tiendas}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={CardProveedor}
        />

        <View style={{height: 1000}} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  storeImageContainer: {
    width: '100%',
    height: 300,
    position: 'absolute',
    zIndex: 2,
  },
  flexOne: {flex: 1},
  header: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: Colors.text,
    zIndex: 1,
  },
  headerText: {
    color: Colors.text2,
    fontWeight: 'bold',
    fontSize: 20,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    marginTop: 30,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 5,
  },
  listContent: {
    paddingBottom: 25,
  },
});
