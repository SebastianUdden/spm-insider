import React, { useState } from "react"
import styled from "styled-components"
import Graph from "../graph/Graph"
import { colors } from "../../constants/colors"
import {
  MOCK_DATES,
  MOCK_MARKNADSSOK,
  MOCK_XY_VALUES,
} from "../../constants/mock-data"

const Label = styled.p`
  margin-bottom: 0.5rem;
  margin-left: 0.1rem;
  color: ${colors.orange};
`

const getTotalPrice = list =>
  list.map(x =>
    x.transactionType.toLowerCase().includes("avyttring")
      ? -x.price * x.volume
      : x.price * x.volume
  )

const getSum = list => list.reduce((a, b) => a + b, 0).toFixed(2)

const NetLongShort = () => {
  const [selectedPoint, setSelectedPoint] = useState(0)
  const buyOrSell = MOCK_MARKNADSSOK.filter(
    x =>
      x.transactionType.toLowerCase().includes("avyttring") ||
      x.transactionType.toLowerCase().includes("förvärv")
  )
  const lists = MOCK_DATES.map(date =>
    buyOrSell.filter(
      x => x.dateOfPublication === new Date(date).toLocaleDateString()
    )
  ).map(list => parseFloat(getSum(getTotalPrice(list))))
  console.log(lists)

  return (
    <>
      <Label>MSEK</Label>
      <Graph
        id={"insider-graph"}
        positions={MOCK_XY_VALUES}
        selectedPoint={selectedPoint}
        setSelectedPoint={setSelectedPoint}
        showZeroLine
        minValue={-100000}
        maxValue={100000}
      />
    </>
  )
}

export default NetLongShort
