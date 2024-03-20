import { FieldContent, InputLabel, InputText, InputTextModificate } from "./style"

export const BoxInput = ({
    fieldWidht = 100,
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
    insertRecord
}) => {
    return (
        <FieldContent
            fieldWidht={fieldWidht}
        >
            <InputLabel>{textLabel}</InputLabel>

            {insertRecord ? (
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