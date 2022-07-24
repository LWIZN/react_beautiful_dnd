import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 8px;
`;

const Item = styled.div`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin-bottom: 8px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          text: "Learn React",
        },
        {
          id: 2,
          text: "Learn Redux",
        },
        {
          id: 3,
          text: "Watch TV",
        },
      ],
    };
  }

  render() {
    return (
      <DragDropContext
        onDragEnd={(result) => {
          console.log(result);
          const { source, destination, draggableId } = result;
          if (!destination) {
            return;
          }

          let arr = Array.from(this.state.todos);
          console.log(arr);
          const [remove] = arr.splice(source.index, 1);
          arr.splice(destination.index, 0, remove);
          this.setState({
            todos: arr,
          });
        }}
      >
        <Droppable droppableId="d">
          {(provided) => (
            <Container ref={provided.innerRef} {...provided.droppableProps}>
              {this.state.todos.map((t, i) => (
                <Draggable draggableId={t.id} index={i}>
                  {(p) => (
                    <Item
                      ref={p.innerRef}
                      {...p.draggableProps}
                      {...p.dragHandleProps}
                      key={t.id}
                    >
                      {t.text}
                    </Item>
                  )}
                </Draggable>
              ))}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
