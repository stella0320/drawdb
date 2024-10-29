import LayoutContextProvider from "../context/LayoutContext";
import TransformContextProvider from "../context/TransformContext";
import TablesContextProvider from "../context/DiagramContext";
import UndoRedoContextProvider from "../context/UndoRedoContext";
import SelectContextProvider from "../context/SelectContext";
import AreasContextProvider from "../context/AreasContext";
import NotesContextProvider from "../context/NotesContext";
import TypesContextProvider from "../context/TypesContext";
import TasksContextProvider from "../context/TasksContext";
import SaveStateContextProvider from "../context/SaveStateContext";
import EnumsContextProvider from "../context/EnumsContext";
import Report from "../components/Report";

export default function TableSummary() {
  return (
    <LayoutContextProvider>
      <TransformContextProvider>
        <UndoRedoContextProvider>
          <SelectContextProvider>
            <TasksContextProvider>
              <AreasContextProvider>
                <NotesContextProvider>
                  <TypesContextProvider>
                    <EnumsContextProvider>
                      <TablesContextProvider>
                        <SaveStateContextProvider>
                          <Report />
                        </SaveStateContextProvider>
                      </TablesContextProvider>
                    </EnumsContextProvider>
                  </TypesContextProvider>
                </NotesContextProvider>
              </AreasContextProvider>
            </TasksContextProvider>
          </SelectContextProvider>
        </UndoRedoContextProvider>
      </TransformContextProvider>
    </LayoutContextProvider>
  );
}
