import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { ContainerInput } from './Style';
import { LabelSchedule } from '../ScheduleModal/Style';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

export default function SelectInput({
	defaultText = '',
	handleSelectedFn = null,
	labelText = '',
}) {
	const dataAtual = moment().format('YYYY-MM-DD');
	const [arrayOptions, setArrayOptions] = useState(null);

	function LoadOptions() {
		const horasRestantes = moment(dataAtual)
			.add(24, 'hours')
			.diff(moment(new Date()), 'hours');

		const options = Array.from(
			{ length: horasRestantes },
			(_, index) => {
				let valor = new Date().getHours() + (index + 1);
				return {
					label: `${valor}:00`,
					value: valor,
				};
			},
		);

		setArrayOptions(options);
	}

	useEffect(() => {
		LoadOptions();
	}, []);

	return (
		<View>
			{arrayOptions != null ? (
				<ContainerInput>
					<LabelSchedule>
						{labelText}
					</LabelSchedule>
					<SelectDropdown
						data={arrayOptions.map(
							(x) => x.label,
						)}
						defaultButtonText={defaultText}
						onSelect={(
							selectedItem,
							index,
						) => {
							handleSelectedFn(
								selectedItem,
							);
							// setHoraConsulta(selectedItem)
						}}
						buttonStyle={styles.button}
						buttonTextStyle={
							styles.buttonText
						}
						renderDropdownIcon={() => (
							<AntDesign
								name="caretdown"
								size={24}
								color="#34898F"
							/>
						)}
					/>
				</ContainerInput>
			) : (
				<ActivityIndicator />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'transparent',
		borderRadius: 8,
		borderColor: '#60BFC5',
		borderWidth: 2,
		width: '100%',
		height: 54,
		paddingLeft: 16,
		paddingRight: 16,
	},
	buttonText: {
		color: '#34898F',
		fontSize: 16,
		fontFamily: 'MontserratAlternates_600SemiBold',
		textAlign: 'left',
	},
});
