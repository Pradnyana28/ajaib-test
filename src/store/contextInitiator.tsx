import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react"

export const createCustomContext = <T extends {}>(defaultValue: T) => {
    type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;

    const defaultUpdate: UpdateType = () => defaultValue;
    const ctx = createContext({
        state: defaultValue,
        update: defaultUpdate
    });

    const Provider = (props: PropsWithChildren<{}>) => {
        const [state, update] = useState(defaultValue);
        return <ctx.Provider value={{ state, update }} {...props} />;
    }

    return [ctx, Provider] as const;
}