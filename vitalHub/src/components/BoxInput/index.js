import {
	FieldContent,
	InputLabel,
	InputText,
	InputTextModificate,
} from './style';

export const BoxInput = ({
	fieldWidth = 100,
	fieldHeight = 50,
	editable = false,
	textLabel,
	placeholder,
	fieldValue,
	onChangeText = null,
	keyType = 'default',
	maxLenght,
	onBlur = null,
	multiline,
	keyboardType,
	insertRecord,
}) => {
	return (
		<FieldContent fieldWidth={fieldWidth}>
			<InputLabel>{textLabel}</InputLabel>

			{insertRecord ? (
				<>
					<InputTextModificate
						fieldWidth={fieldWidth}
						editable={editable}
						placeholder={placeholder}
						fieldValue={fieldValue}
						onChangeText={onChangeText}
						keyType={keyType}
						maxLenght={maxLenght}
						onBlur={onBlur}
						fieldHeight={fieldHeight}
						multiline={multiline}
						keyboardType={keyboardType}
					/>
				</>
			) : (
				<>
					<InputText
						fieldWidth={fieldWidth}
						editable={editable}
						placeholder={placeholder}
						fieldValue={fieldValue}
						onChangeText={onChangeText}
						keyType={keyType}
						maxLenght={maxLenght}
						onBlur={onBlur}
						fieldHeight={fieldHeight}
						multiline={multiline}
						keyboardType={keyboardType}
					/>
				</>
			)}
		</FieldContent>
	);
};
