package com.imnotdurnk.domain.gamelog.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VoiceResultDto {

    int planId;
    int score;
    String filename;
    String script;
}
