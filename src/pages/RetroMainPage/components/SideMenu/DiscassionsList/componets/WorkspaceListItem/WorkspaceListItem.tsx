import { getDatabase, ref, set } from 'firebase/database'
import { Spacer } from '../../../../../../../components/Spacer'
import { IDiscassion, useDiscassions } from '../../../../../../../store/useDiscassions'
import { formatDate } from '../../../../../../../utils/dateUtils'
import * as Styled from './WorkspaceListItem.styled'
import { useNavigate } from 'react-router-dom'
import Close from '../../../../../../../assets/close'
import { IconButton } from '../../../../../../../components/IconButton'

interface IWorkspaceItem {
    item: IDiscassion,
    setCurrent: () => void
}

export const WorkspaceListItem = (props: IWorkspaceItem) => {

    const navigate = useNavigate()

    const db = getDatabase()

    const {currentDiscassionId, setCurrentDiscassionId} = useDiscassions();

    const {item, setCurrent,} = props

    const deleteDiscassion = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        set(ref(db,'discassions/' + item.id), null)
        set(ref(db,'workspaces/' + item.id), null)

        if(currentDiscassionId === item.id){
            setCurrentDiscassionId(undefined)
            navigate({pathname:'/'})
        }
    }

    return (
        <Styled.WorkspaceListItem onClick={setCurrent} $isCurrent={item.id===currentDiscassionId}>
            <Styled.Info>
                <Styled.Label>{item.name}</Styled.Label>
                <Styled.Date>{formatDate(item.date)}</Styled.Date>
            </Styled.Info>
            <Spacer/>
            <IconButton onClick={(e)=>deleteDiscassion(e)}> 
                <Close/>
            </IconButton>
        </Styled.WorkspaceListItem>
    )
}