const getRuCondition = (condition: string)=>{
    const ruConditions: {[key: string]: string} = {
        USED: "Б/У",
        NEW: "Новая"
    }
    return ruConditions[condition]
}
export default  getRuCondition