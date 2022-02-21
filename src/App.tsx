import { useEffect, useState } from "react";
import styled from "@emotion/styled";

/**
 * Own
 */
// models
import { TodoInitialData, TodoConfig, StorageKeys } from  "./data";

// assets
import "./App.css";
import logo from "./logo.png";

// providers
import { ToDoDataService } from "./providers";

// elements
import ToDo from "./view/Todo";
import { TaskTableSearch } from "./view";

const LogoCard = styled.section`
    display: flex;
    background: white;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 15px;
    min-height: 105px;
    margin-top: 16px;
    width: 350px;
    margin-left: 16px;

    .nested-info-details {
        display: flex;
        color: #7d7d7d;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        font-weight: 400px;
    }

    img {
        margin-left: 8px;
    }
`;

function App() {
    const [showTaskTableDataState, setShowTaskTableDataState] = useState(false);
    const [refreshTaskChildElements, setRefreshTaskChildElements] = useState(false);

    useEffect(() => {
        const i18nTexts = [
            "There was a problem trying to get the information from the server or it is corrupt"
        ];

        let persistentData = ToDoDataService.getCurrentPersistentData();

        if (!persistentData?.length) {
            localStorage.setItem(StorageKeys.TODO_MAIN_DATA, JSON.stringify(TodoInitialData));
            persistentData = ToDoDataService.getCurrentPersistentData();
        }

        try {
            const handler = (success: boolean) => {
                if (success) {
                    ToDoDataService.refreshData(persistentData);
                }

                setShowTaskTableDataState(true);
                ToDoDataService.isLoading = !showTaskTableDataState;
            };

            if (!persistentData?.length) {
                handler(false);
                throw new Error(i18nTexts[0]);
            }

            handler(true);
        } catch (err) {
            alert(err);
        }

        return () => {
            // Cleanup executed!
        };
    });

    return (
        <div className="App">
            <LogoCard>
                <img src={logo} className="app-logo" alt="Flexsible Company" />
            </LogoCard>
            {   showTaskTableDataState && <TaskTableSearch props={{ onResultsChange: (result: TodoConfig) => {
                    setRefreshTaskChildElements(true);
                    setTimeout(() => {
                        setRefreshTaskChildElements(false);
                    }, 1000);
                }}} />
            }
            { showTaskTableDataState && <ToDo props={ { reload: () =>  setRefreshTaskChildElements(refreshTaskChildElements) }} />}
        </div>
    );
}

export default App;
