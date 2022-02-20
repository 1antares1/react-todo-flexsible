/**
 * Own
 */
// models
import { TodoInitialConfig } from "../data";
import { TodoConfig, TodoData } from "../data/models";
import { StorageKeys } from "../data/enums";

export class ToDoDataService {
    public  static getCurrentPersistentData(): TodoData[] {
        try {
            const data = localStorage.getItem(StorageKeys.TODO_MAIN_DATA);
            return JSON.parse(data || "") as TodoData[];
        } catch (err) {
            // to do
        }
        return [] as TodoData[];
    }

    public static addOrReplaceItem(item: TodoData, splice?: boolean, handler?: (success: boolean, reason?: any) => void): void {
        let persistentData = this.getCurrentPersistentData();
        const currentItemIndex = persistentData?.findIndex(x => x.id === item.id) ?? -1;

        if (splice) {
            persistentData.splice(currentItemIndex, 1);
        } else {
            if (currentItemIndex !== -1) {
                persistentData[currentItemIndex] = item;
            } else {
                item.id = persistentData?.length || 0;
                persistentData.push(item);
            }
        }

        localStorage.setItem(StorageKeys.TODO_MAIN_DATA, JSON.stringify(persistentData));

        if (handler) {
            handler(true, persistentData);
        }
    }

    public static refreshData(currentData: TodoData[], syncData?: boolean): TodoConfig {
        const defaultColumnIds = Object.keys(TodoInitialConfig);

        defaultColumnIds.forEach((elem: string, idx: number) => {
            TodoInitialConfig[defaultColumnIds[idx]].columns.elements = currentData.filter(x => x.status === idx);
        });

        if (syncData) {
            localStorage.setItem(StorageKeys.TODO_MAIN_DATA, JSON.stringify(currentData));
        }

        return TodoInitialConfig;
    }

    public static getSystemUsers(): any[] {
        return [
            {
                key: "0",
                value: "José Ramírez"
            },
            {
                key: "1",
                value: "Nate Zapata"
            },
            {
                key: "2",
                value: "Anatoly Yakovenko"
            },
            {
                key: "3",
                value: "Vitalik Buterin"
            }
        ];
    }
}
