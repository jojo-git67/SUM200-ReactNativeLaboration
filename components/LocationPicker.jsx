import { Host, Row, Picker, Spacer, Text } from '@expo/ui';
import {LOCATIONS} from "../data/locations.js";


export default function LocationPicker( {selectedLocation, setSelectedLocation} ) {
    return (
        <Host matchContents={{ vertical: true }} style={{ width: "100%" }}>
            <Row alignment="center" spacing={12} style={{ padding: 16 }}>
                <Text>Location:</Text>
                <Spacer flexible />
                <Picker selectedValue={selectedLocation} onValueChange={setSelectedLocation}>
                    {LOCATIONS.map(location => (
                        <Picker.Item key={location.value} label={location.label} value={location.value}/>
                    ))}
                </Picker>

            </Row>
        </Host>
    );
}