import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { BoxInput } from "../../components/BoxInput"
import { Container, ContentInfo, ContentLocal } from "../../components/Container/Style"
import { SubTitle, Title } from "../../components/Title/Style"
import { ContainerAddress, ContainerLocal, LocalImage } from "./Style"
import { StyleSheet } from "react-native"


export const LocalAppointment = () => {
    return (
        <Container>
            <ContentLocal>
                <MapView
                    style={styles.map}
                    customMapStyle={grayMapStyle}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: -23.6150,
                        longitude: -46.5707,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: -23.6150,
                            longitude: -46.5707,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005
                        }}
                        title='Destino'
                        description='Rua Roseira'
                        pinColor={'red'}
                    />
                </MapView>
            </ContentLocal>
            <ContentInfo>
                <ContainerLocal>
                    <Title>Clínica Natureh</Title>
                    <SubTitle>São Paulo, SP</SubTitle>
                </ContainerLocal>

                <BoxInput
                    fieldWidht={80}
                    textLabel='Endereco'
                    placeholder='Rua Vicenso Silva, 987'
                />
                <ContainerAddress>
                    <BoxInput
                        fieldWidht={35}
                        textLabel='Número'
                        placeholder='578'
                    />

                    <BoxInput
                        fieldWidht={35}
                        textLabel='Bairro'
                        placeholder='Moema-SP'
                    />

                </ContainerAddress>
            </ContentInfo>
        </Container>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: '100%',
        height: '60%'
    }

});

const grayMapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#E1E0E7",
        },
      ],
    },
    {
      elementType: "geometry.fill",
      stylers: [
        {
          saturation: -5,
        },
        {
          lightness: -5,
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#FBFBFB",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#33303E",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: "#fbfbfb",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#fbfbfb",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#fbfbfb",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#fbfbfb",
        },
      ],
    },
    {
      featureType: "poi.business",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#fbfbfb",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "white",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "white",
        },
      ],
    },
    {
      featureType: "road",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#C6C5CE",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#FBFBFB",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#ACABB7",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#8C8A97",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#8C8A97",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#fbfbfb",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#fbfbfb",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#5DE3F5",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#fbfbfb",
        },
      ],
    },
  ]