import { FieldContent, InputLabel, InputText, InputTextModificate } from "./style"

export const BoxInput = ({
    fieldWidht = 100,
    fieldHeight = '',
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
    RecordEdit,
    placeholderTextColor,
    borderColor,
    borderWidth,
}) => {
    return (
        <FieldContent
            fieldWidht={fieldWidht}

        >
            <InputLabel>{textLabel}</InputLabel>

            {RecordEdit ? (
                <>
                    <InputTextModificate
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
    )


}