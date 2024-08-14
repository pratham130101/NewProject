module ALU (
    input [18:0] r2, r3,
    input [3:0] opcode,
    output reg [18:0] r1
);
    always @(*) begin
        case (opcode)
            4'b0000: r1 = r2 + r3; 
            4'b0001: r1 = r2 - r3; 
            4'b0010: r1 = r2 * r3; 
            4'b0011: r1 = r2 / r3; 
            4'b0100: r1 = r2 & r3; 
            4'b0101: r1 = r2 | r3; 
            4'b0110: r1 = r2 ^ r3; 
            4'b0111: r1 = ~r2;     
            4'b1000: r1 = r1 + 1;  
            4'b1001: r1 = r1 - 1;  
            default: r1 = 19'b0;   
        endcase
    end
endmodule

module RegisterFile (
    input clk,
    input reset,
    input [3:0] r1, r2, r3,
    input [18:0] write_data,
    input write_enable,
    output reg [18:0] r2_out,
    output reg [18:0] r3_out
);
    reg [18:0] registers [15:0];  
        integer i;

    always @(posedge clk or posedge reset) begin
        if (reset) begin
                    
            for (i = 0; i < 16; i = i + 1) begin
                registers[i] <= 19'b0;
            end
        end else if (write_enable) begin
            registers[r1] <= write_data;
        end
    end

    always @(*) begin
        r2_out = registers[r2];
        r3_out = registers[r3];
    end
endmodule

module CPU (
    input clk,
    input reset,
    input [18:0] instruction,
    output [18:0] result,
    output reg [14:0] PC
);
    
    parameter MEM_SIZE = 32768; 
    parameter STACK_SIZE = 16;  
    parameter SP_SIZE = 4;      

    
    reg [14:0] addr;
    reg [3:0] opcode;
    reg [3:0] r1, r2, r3;
    wire [18:0] reg_file_out_r2, reg_file_out_r3;
    wire [18:0] ALU_result;
    reg write_enable;
    reg [18:0] memory [MEM_SIZE-1:0]; 
    reg [18:0] stack [STACK_SIZE-1:0]; 
    reg [SP_SIZE-1:0] SP;              

    
    ALU alu (
        .r1(reg_file_out_r2),
        .r2(reg_file_out_r2),
        .r3(reg_file_out_r3),
        .opcode(opcode),
        .result(ALU_result)
    );

    
    RegisterFile reg_file (
        .clk(clk),
        .reset(reset),
        .r1(r1),
        .r2(r2),
        .r3(r3),
        .write_data(ALU_result),
        .write_enable(write_enable),
        .r2_out(reg_file_out_r2),
        .r3_out(reg_file_out_r3)
    );

    
    always @(posedge clk or posedge reset) begin
        if (reset) begin
            PC <= 15'b0;
            SP <= 0;
            write_enable <= 0;
        end else begin
            
            opcode <= instruction[18:15];
            r1 <= instruction[14:12];
            r2 <= instruction[11:9];
            r3 <= instruction[8:6];
            addr <= instruction[5:0];

            
            write_enable <= 0;

            case (opcode)
                4'b0000: write_enable <= 1; 
                4'b0001: write_enable <= 1; 
                4'b0010: write_enable <= 1; 
                4'b0011: write_enable <= 1; 
                4'b0100: write_enable <= 1; 
                4'b0101: write_enable <= 1; 
                4'b0110: write_enable <= 1; 
                4'b0111: write_enable <= 1; 
                4'b1000: write_enable <= 1; 
                4'b1001: write_enable <= 1; 
                4'b1010: PC <= addr;         
                4'b1011: if (reg_file_out_r2 == reg_file_out_r3) PC <= addr; 
                4'b1100: if (reg_file_out_r2 != reg_file_out_r3) PC <= addr; 
                4'b1101: begin 
                    stack[SP] <= PC;
                    SP <= SP + 1;
                    PC <= addr;
                end
                4'b1110: begin
                    SP <= SP - 1;
                    PC <= stack[SP]; 
                end
                4'b1111: begin 
                    if (instruction[14] == 1) begin
                        memory[addr] <= r1; 
                    end else begin
                        r1 <= memory[addr]; 
                    end
                end
                default: ;
            endcase
        end
    end

    assign result = ALU_result;
endmodule