import * as React from "react";
import { Dialog, Portal, Text } from "react-native-paper";

const FinishTasksDialog = (props) => {
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text variant="bodyMedium">This is simple dialog</Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default FinishTasksDialog;
